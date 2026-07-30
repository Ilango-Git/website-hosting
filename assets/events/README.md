# Updating Event Photos

Use this folder for year-wise event galleries.

Recommended structure:

```text
assets/events/
  2026/
    arangetram_june/
      cover.jpg
      001.jpg
      002.jpg
      event.json
```

Each event folder should contain one `event.json` file:

```json
{
  "title": "Arangetram",
  "month": "June",
  "year": "2026",
  "description": "Student Arangetram performance by Thulir Nrithyalaya Foundation.",
  "cover": "cover.jpg",
  "photos": ["001.jpg", "002.jpg"]
}
```

After adding or changing event folders, run this command from the website root:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\generate-events.ps1
```

This updates:

```text
assets/events/events.json
```

The website reads `events.json` to show event cards.
