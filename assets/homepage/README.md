# Updating Homepage Slider Images

Use this folder for the rotating images shown in the homepage hero section.

Recommended structure:

```text
assets/homepage/
  001.jpg
  002.jpg
  003.jpg
```

After adding, deleting, or renaming homepage images, run this command from the website root:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\generate-homepage.ps1
```

This updates:

```text
assets/homepage/homepage.json
assets/homepage/homepage-data.js
```

The website reads `homepage-data.js` to show the rotating homepage images.

Image recommendations:

- Use landscape photos where possible.
- Resize photos to a maximum width of 1600px before uploading.
- Keep each image under 300-500 KB where possible.
- Use lowercase file names and avoid spaces.
- Use ordered names such as `001.jpg`, `002.jpg`, `003.jpg`.
