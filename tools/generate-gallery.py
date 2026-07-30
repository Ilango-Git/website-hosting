import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    print("Pillow is required. Install it with: python -m pip install Pillow")
    sys.exit(1)


PROJECT_ROOT = Path(__file__).resolve().parent.parent
SOURCE_ROOT = PROJECT_ROOT / "assets" / "gallery-source"
GALLERY_ROOT = PROJECT_ROOT / "assets" / "gallery"
OPTIMIZED_ROOT = GALLERY_ROOT / "optimized"
THUMBNAIL_ROOT = GALLERY_ROOT / "thumbnails"
JSON_OUTPUT = GALLERY_ROOT / "gallery.json"
SCRIPT_OUTPUT = GALLERY_ROOT / "gallery-data.js"
STATE_OUTPUT = GALLERY_ROOT / "gallery-state.json"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_THUMBNAIL_WIDTH = 640
MAX_FULL_IMAGE_BYTES = 1_500_000
PIPELINE_VERSION = "2026-07-original-pixels-1500kb-thumb640"


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "photo"


def titleize(value: str) -> str:
    words = re.sub(r"[-_]+", " ", value).strip()
    return words.title() if words else "Gallery"


def resize_to_width(image: Image.Image, max_width: int) -> Image.Image:
    if image.width <= max_width:
        return image.copy()

    height = round(image.height * (max_width / image.width))
    return image.resize((max_width, height), Image.Resampling.LANCZOS)


def save_jpeg(image: Image.Image, path: Path, quality: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(
        path,
        "JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
    )


def save_full_jpeg(image: Image.Image, path: Path) -> tuple[int, int]:
    path.parent.mkdir(parents=True, exist_ok=True)

    minimum_quality = 58
    maximum_quality = 92
    best_quality: int | None = None
    best_size: int | None = None
    last_quality: int | None = None

    while minimum_quality <= maximum_quality:
        quality = (minimum_quality + maximum_quality) // 2
        image.convert("RGB").save(
            path,
            "JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
            subsampling=0,
        )
        file_size = path.stat().st_size
        last_quality = quality

        if file_size <= MAX_FULL_IMAGE_BYTES:
            best_quality = quality
            best_size = file_size
            minimum_quality = quality + 1
        else:
            maximum_quality = quality - 1

    if best_quality is None:
        if last_quality != 58:
            image.convert("RGB").save(
                path,
                "JPEG",
                quality=58,
                optimize=True,
                progressive=True,
                subsampling=0,
            )
        return 58, path.stat().st_size

    if last_quality != best_quality:
        image.convert("RGB").save(
            path,
            "JPEG",
            quality=best_quality,
            optimize=True,
            progressive=True,
            subsampling=0,
        )

    return best_quality, best_size


def build_caption(category: str, source_stem: str, index: int) -> str:
    if source_stem.isdigit():
        return f"Thulir Nrithyalaya Foundation {category} photo {index}"

    description = titleize(source_stem)
    return f"{description} - Thulir Nrithyalaya Foundation"


def load_previous_sources() -> tuple[dict[str, dict[str, object]], bool]:
    if not STATE_OUTPUT.exists():
        return {}, True

    try:
        state = json.loads(STATE_OUTPUT.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}, False

    if state.get("version") != PIPELINE_VERSION:
        return {}, False

    sources = state.get("sources")
    return (sources, False) if isinstance(sources, dict) else ({}, False)


def remove_stale_generated_files(root: Path, expected_files: set[Path]) -> int:
    if not root.exists():
        return 0

    root_resolved = root.resolve()
    removed_count = 0

    for path in root.rglob("*.jpg"):
        resolved_path = path.resolve()
        if not resolved_path.is_relative_to(root_resolved):
            continue
        if resolved_path in expected_files:
            continue

        path.unlink()
        removed_count += 1
        print(f"Removed stale generated file {path.relative_to(PROJECT_ROOT).as_posix()}")

    for directory in sorted(
        (path for path in root.rglob("*") if path.is_dir()),
        key=lambda path: len(path.parts),
        reverse=True,
    ):
        if not any(directory.iterdir()):
            directory.rmdir()

    return removed_count


def process_gallery() -> tuple[list[dict[str, str]], dict[str, dict[str, object]], int, int, int]:
    SOURCE_ROOT.mkdir(parents=True, exist_ok=True)
    GALLERY_ROOT.mkdir(parents=True, exist_ok=True)

    previous_sources, allow_output_bootstrap = load_previous_sources()
    photos: list[dict[str, str]] = []
    current_sources: dict[str, dict[str, object]] = {}
    expected_optimized: set[Path] = set()
    expected_thumbnails: set[Path] = set()
    processed_count = 0
    skipped_count = 0

    for category_dir in sorted(path for path in SOURCE_ROOT.iterdir() if path.is_dir()):
        category = titleize(category_dir.name)
        category_slug = slugify(category_dir.name)
        used_names: set[str] = set()

        source_images = sorted(
            path
            for path in category_dir.iterdir()
            if path.is_file() and path.suffix.lower() in ALLOWED_EXTENSIONS
        )

        for index, source_path in enumerate(source_images, start=1):
            output_stem = slugify(source_path.stem)
            if output_stem in used_names:
                output_stem = f"{output_stem}-{index}"
            used_names.add(output_stem)

            optimized_path = OPTIMIZED_ROOT / category_slug / f"{output_stem}.jpg"
            thumbnail_path = THUMBNAIL_ROOT / category_slug / f"{output_stem}.jpg"
            source_key = source_path.relative_to(PROJECT_ROOT).as_posix()
            optimized_relative = optimized_path.relative_to(PROJECT_ROOT).as_posix()
            thumbnail_relative = thumbnail_path.relative_to(PROJECT_ROOT).as_posix()
            source_stat = source_path.stat()
            source_state: dict[str, object] = {
                "mtime_ns": source_stat.st_mtime_ns,
                "size": source_stat.st_size,
                "optimized": optimized_relative,
                "thumbnail": thumbnail_relative,
            }

            expected_optimized.add(optimized_path.resolve())
            expected_thumbnails.add(thumbnail_path.resolve())

            outputs_exist = (
                optimized_path.exists()
                and optimized_path.stat().st_size > 0
                and thumbnail_path.exists()
                and thumbnail_path.stat().st_size > 0
            )
            is_unchanged = previous_sources.get(source_key) == source_state and outputs_exist
            if allow_output_bootstrap and outputs_exist:
                outputs_are_current = (
                    optimized_path.stat().st_mtime_ns >= source_stat.st_mtime_ns
                    and thumbnail_path.stat().st_mtime_ns >= source_stat.st_mtime_ns
                )
                is_unchanged = outputs_are_current

            if is_unchanged:
                skipped_count += 1
                print(f"Skipped unchanged {source_key}")
            else:
                with Image.open(source_path) as opened_image:
                    image = ImageOps.exif_transpose(opened_image).convert("RGB")
                    thumbnail_image = resize_to_width(image, MAX_THUMBNAIL_WIDTH)
                    full_quality, full_size = save_full_jpeg(image, optimized_path)
                    save_jpeg(thumbnail_image, thumbnail_path, quality=76)

                processed_count += 1
                print(
                    f"Processed {source_key} "
                    f"-> {optimized_relative} "
                    f"({full_size:,} bytes, quality {full_quality})"
                )

            caption = build_caption(category, source_path.stem, index)
            alt = f"{caption}, Chennai"

            photos.append(
                {
                    "src": optimized_relative,
                    "thumb": thumbnail_relative,
                    "category": category,
                    "caption": caption,
                    "alt": alt,
                }
            )
            current_sources[source_key] = source_state

    removed_count = remove_stale_generated_files(OPTIMIZED_ROOT, expected_optimized)
    removed_count += remove_stale_generated_files(THUMBNAIL_ROOT, expected_thumbnails)

    return photos, current_sources, processed_count, skipped_count, removed_count


def write_manifest(photos: list[dict[str, str]]) -> None:
    manifest = {"photos": photos}
    json_text = json.dumps(manifest, indent=2, ensure_ascii=True)
    JSON_OUTPUT.write_text(json_text + "\n", encoding="utf-8")
    SCRIPT_OUTPUT.write_text(
        f"window.THULIR_GALLERY = {json_text};\n",
        encoding="utf-8",
    )


def write_state(sources: dict[str, dict[str, object]]) -> None:
    state = {
        "version": PIPELINE_VERSION,
        "sources": sources,
    }
    STATE_OUTPUT.write_text(
        json.dumps(state, indent=2, ensure_ascii=True) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    photos, sources, processed_count, skipped_count, removed_count = process_gallery()
    write_manifest(photos)
    write_state(sources)
    print(f"Updated {JSON_OUTPUT} with {len(photos)} photo(s).")
    print(f"Updated {SCRIPT_OUTPUT} with {len(photos)} photo(s).")
    print(
        f"Summary: {processed_count} processed, "
        f"{skipped_count} unchanged, {removed_count} stale generated file(s) removed."
    )


if __name__ == "__main__":
    main()
