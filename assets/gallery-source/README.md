# Adding Gallery Photos

Add original gallery photos only inside this folder.

Use one folder for each category:

```text
assets/gallery-source/
  classes/
    001.jpg
    002.jpg
  guru/
    001.jpg
  performances/
    001.jpg
  salangai-poojai/
    001.jpg
  arangetram/
    001.jpg
  awards/
    001.jpg
```

After adding, deleting, or renaming photos, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\generate-gallery.ps1
```

You may place original camera photos here. The generator keeps these originals and creates optimized website images separately.

Full lightbox images keep their original pixel dimensions and are compressed to approximately 1.5 MB or less. Thumbnails remain small for fast gallery browsing.

The generator is incremental:

- New or modified source photos are processed.
- Unchanged photos are skipped, so they are not compressed again.
- Renamed photos are generated under their new names.
- Generated images are removed when their corresponding source photos are deleted.

Naming guidance:

- Use lowercase filenames where possible.
- Use ordered names such as `001.jpg`, `002.jpg`, `003.jpg`.
- For better captions, use descriptive names such as `temple-performance-2026.jpg`.
- Avoid spaces in filenames.

Website behavior:

- Category filters are generated automatically.
- The first 12 matching photos are displayed.
- Visitors can select `View More Photos` to load the next 12.
