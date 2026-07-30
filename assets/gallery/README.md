# Generated Gallery Files

Do not place original photos in this folder.

The files and folders here are generated from:

```text
assets/gallery-source/
```

Generated output includes:

```text
assets/gallery/
  optimized/
  thumbnails/
  gallery.json
  gallery-data.js
  gallery-state.json
```

To rebuild the gallery, run this command from the website root:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\generate-gallery.ps1
```

The generator:

- Preserves the original pixel dimensions for full gallery images.
- Adjusts JPEG compression while keeping full gallery images at approximately 1.5 MB or less.
- Creates 640px thumbnails.
- Compresses images for faster mobile loading.
- Converts output filenames to lowercase JPG.
- Generates category names from source folder names.
- Creates `gallery.json` and `gallery-data.js`.
- Uses `gallery-state.json` to skip unchanged source photos.
- Processes only new or modified photos and cleans up generated files for deleted sources.

Do not edit `gallery-state.json`; the generator maintains it automatically.
