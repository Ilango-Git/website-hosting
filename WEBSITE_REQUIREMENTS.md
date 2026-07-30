# Thulir Nrithyalaya Foundation Website Requirements

## 1. Project Goal

Create a new, modern, static HTML website for **Thulir Nrithyalaya Foundation** that clearly presents the foundation, Bharatanatyam training, cultural activities, student milestones, gallery, and contact details.

The new website should replace the current site at:

https://thulirnrithyalaya.org/

SEO-ready website copy, metadata, FAQ content, and image SEO guidance are maintained in:

- `WEBSITE_SEO_CONTENT.md`

## 1.1 Confirmed Foundation Details

- Official name: **Thulir Nrithyalaya Foundation**
- Logo file: `THULIRNRITHYALAYA-FOUNDATION-Logo.png`
- Preferred homepage image file: `Homepage.jpg`
- Foundation lead / person running the foundation: **Marai Mozhi Arasi J**
- Address: **8/332, 2nd Floor, Kambar Street, 2nd Main Road, Vijayanagaram, Santhosapuram, Medavakkam, Chennai, Tamil Nadu 600100**
- Contact number: **+91 93846 45942**
- WhatsApp number: **+91 93846 45942**
- Email address: **marai.jesu@gmail.com**

## 2. Current Website Review

The existing website has useful content, but it needs improvement before being used as the foundation's main public presence.

### Current Strengths

- Covers the main sections visitors expect: Home, About Us, Services, Gallery, and Contact.
- Explains Bharatanatyam training, Salangai Poojai, and Arangetram.
- Includes address, phone numbers, and email.
- Has a photo gallery that can be reused or improved.

### Current Issues To Fix

- Branding is inconsistent. The site title says "Elango vin Naatiya Kalalayam" while the new foundation name is "Thulir Nrithyalaya Foundation".
- Several spelling and grammar issues reduce professionalism.
- Some text appears copied from generic dance-school content and should be rewritten for the foundation.
- The design looks outdated and should be modernized.
- The site should be mobile-first and work cleanly on phones.
- Contact email currently shows `Info@nattiyakalalayam.com` / `info@nattiyakalalayam.com`; this should be changed to the foundation's correct email.
- The login/signup/subscribe sections on the current site do not appear necessary for a public foundation website.
- Gallery images should be organized into meaningful categories instead of appearing as a long image list.
- The website needs clearer calls to action, such as "Join Classes", "Contact Us", "View Gallery", and "Support the Foundation".

## 3. Target Audience

The website should serve:

- Parents looking for Bharatanatyam classes for children.
- Students interested in classical dance training.
- Event organizers looking for cultural performances.
- Donors, sponsors, and well-wishers who want to support the foundation.
- Existing students and families looking for updates, gallery photos, and contact details.

## 4. Recommended Website Structure

The website should be built as a static HTML website with the following pages or sections.

### Option A: Single-Page Website

Best for a simple first version.

- Home
- About
- Classes / Training
- Events & Milestones
- Gallery
- Contact

### Option B: Multi-Page Website

Best if the foundation wants more content and better SEO.

- `index.html` - Home
- `about.html` - About the Foundation
- `classes.html` - Bharatanatyam Classes and Training
- `events.html` - Salangai Poojai, Arangetram, Programs, Workshops
- `gallery.html` - Photo Gallery
- `contact.html` - Contact, WhatsApp, and Map

Recommended approach: start with **Option A** for faster launch, then expand to **Option B** when more content is ready.

## 5. Page Requirements

### 5.1 Home Section

Purpose: Create a strong first impression.

Content required:

- Foundation name: **Thulir Nrithyalaya Foundation**
- Logo: use `THULIRNRITHYALAYA-FOUNDATION-Logo.png`.
- Short tagline, for example:
  - "Nurturing Bharatanatyam, Culture, Discipline, and Devotion"
- Hero should use a rotating homepage image slider loaded from `assets/homepage/homepage-data.js`.
- Homepage images should be managed through the `assets/homepage/` folder.
- The slider should automatically move one image at a time.
- The slider should pause while the visitor's cursor is over the hero area and continue when the cursor leaves.
- Primary buttons:
  - "Join Classes"
  - "Contact Us"
  - "View Gallery"

### 5.2 About Section

Purpose: Explain who runs the foundation and why it exists.

Content required:

- Founder/family profile for you and your wife.
- Dedicated profile section for **Marai Mozhi Arasi J**, who is actively running Thulir Nrithyalaya Foundation.
- Short history of the foundation.
- Why the foundation was started.
- Guru/training background.
- Values:
  - Tradition
  - Discipline
  - Devotion
  - Confidence
  - Cultural learning
  - Community service

Suggested copy direction:

"Thulir Nrithyalaya Foundation is dedicated to preserving and teaching Bharatanatyam while helping students grow with discipline, confidence, cultural awareness, and respect for Indian classical arts."

Suggested profile copy for **Marai Mozhi Arasi J**:

"Natya Nattuvangam Smt. Marai Mozhi Arasi J is an eminent Bharatanatyam practitioner, dancer, choreographer, and founder of Thulir Nrithyalaya Foundation. Born and raised in Chennai, she began her dance journey at the age of eight. After years of dedicated training under her Guru, Nattuvangam Visharada Smt. Dr. Maria Prakash, she performed in prominent television shows including Vijay TV, Kalaignar TV, and Jaya TV.

Her commitment to Bharatanatyam has earned her several recognitions, including Yuva Kalamani, Global Star Award, Rukmini Devi Arundale Award, and Natya Kalashri. She encourages her students to follow the same dedicated path, and they have actively participated in television programs and temple performances.

Along with her artistic journey, Marai Mozhi Arasi J holds an MBA. She further enriched her Bharatanatyam training in Natyashastra under her Guru, Smt. Vithya Arasu, founder of Natyakalavidyalaya."

### 5.3 Vision & Mission Section

Purpose: Make the foundation's purpose clear.

Vision:

- To nurture young dancers and preserve the classical tradition of Bharatanatyam for future generations.

Mission:

- To provide structured Bharatanatyam training.
- To encourage students through performances, workshops, and cultural programs.
- To build confidence, discipline, and devotion through classical dance.
- To make Indian classical art accessible to the community.

### 5.4 Classes / Training Section

Purpose: Help parents and students understand available training.

Content required:

- Beginner Bharatanatyam classes.
- Intermediate and advanced training.
- Adavu practice.
- Mudras, expressions, rhythm, and theory.
- Performance preparation.
- Salangai Poojai preparation.
- Arangetram preparation.
- Online/offline class availability, if applicable.
- Class location.

Call to action:

- "Contact on WhatsApp"

### 5.5 Events & Milestones Section

Purpose: Explain important student journeys and foundation activities.

Content required:

- Salangai Poojai explanation.
- Arangetram explanation.
- Annual day/programs.
- Temple performances.
- Cultural events.
- Workshops.
- Community or charity programs, if the foundation conducts them.

### 5.6 Gallery Section

Purpose: Show credibility and activity through real photos.

Gallery categories:

- Classes
- Stage Performances
- Salangai Poojai
- Arangetram
- Cultural Events
- Awards / Recognition

Functional requirements:

- Responsive dynamic image grid.
- Click-to-view larger image.
- Optimized image sizes for fast loading.
- Descriptive alt text for accessibility.
- Automatically generated category filters.
- Display the first 12 matching photos and provide a "View More Photos" button for additional photos.
- Gallery photos should be loaded from `assets/gallery/gallery-data.js`.
- `assets/gallery/gallery.json` should also be generated as a readable data reference.
- The foundation should add original photos inside `assets/gallery-source/` category folders and run `tools/generate-gallery.ps1`.
- The generator should preserve original pixel dimensions for full images, adjust JPEG compression to keep full images at approximately 1.5 MB or less, and create 640px thumbnails.
- The generator should track source file size and modification time in `assets/gallery/gallery-state.json`, skip unchanged photos, process new or modified photos, and remove generated files whose source photos were deleted.

Recommended homepage gallery folder structure:

```text
assets/
  gallery-source/
    classes/
      001.jpg
      002.jpg
    performances/
      001.jpg
    salangai-poojai/
      001.jpg
    arangetram/
      001.jpg
  gallery/
    optimized/
    thumbnails/
    gallery-data.js
    gallery.json
```

Homepage gallery update workflow:

- Add or remove original photos inside `assets/gallery-source/{category-name}/`.
- Use lowercase folder and file names.
- Run `powershell -ExecutionPolicy Bypass -File .\tools\generate-gallery.ps1`.
- Upload the generated `assets/gallery/` folder to hosting.

### 5.7 Year-Wise Events Gallery

Purpose: Allow the foundation to keep adding event photos regularly without an admin login, database, or backend.

The website should support an event archive where photos are organized by year and event folder.

Recommended folder structure:

```text
assets/
  events/
    2026/
      arangetram_june/
        cover.jpg
        001.jpg
        002.jpg
        003.jpg
        event.json
      salangai-poojai_august/
        cover.jpg
        001.jpg
        002.jpg
        event.json
    2027/
      annual-day_january/
        cover.jpg
        001.jpg
        002.jpg
        event.json
```

Recommended event metadata file:

```json
{
  "title": "Arangetram",
  "month": "June",
  "year": "2026",
  "description": "Student Arangetram performance by Thulir Nrithyalaya Foundation.",
  "cover": "cover.jpg",
  "photos": ["001.jpg", "002.jpg", "003.jpg"]
}
```

Visitor experience:

- Visitors should be able to browse events year by year.
- Latest year and latest event should appear first.
- Each event should show a cover photo, event title, month, year, and short description.
- Clicking an event should open the event photo gallery.
- Photos should open in a larger lightbox view.
- Gallery should work well on mobile phones.

Foundation update workflow:

- Create a year folder if it does not already exist.
- Create an event folder using lowercase letters and hyphens or underscores.
- Add one `cover.jpg` image for the event card.
- Add event photos as `001.jpg`, `002.jpg`, `003.jpg`, and so on.
- Add or update `event.json` for the event title, date, description, cover image, and photo list.
- Upload the updated folder to hosting.

Recommended image sizes:

- Cover image: 1200px wide.
- Gallery photos: maximum 1600px wide.
- Thumbnail images, if created separately: 600px wide.
- Preferred formats: JPG or WebP.
- Ideal image file size: under 300-500 KB per image.
- Avoid very large phone/camera originals because they will slow down the website.

File naming rules:

- Use lowercase folder and file names.
- Avoid spaces in folder and file names.
- Use hyphens or underscores, for example `annual-day_january`.
- Keep image names simple and ordered: `001.jpg`, `002.jpg`, `003.jpg`.

Implementation recommendation:

- For the first version, maintain event details through `event.json` files.
- Use the existing local generator script, `tools/generate-gallery.ps1`, to scan `assets/gallery-source/`, optimize images, create thumbnails, and generate gallery data automatically.
- This keeps the website static while still making event updates simple.

### 5.8 Contact Section

Purpose: Make direct contact easy without using an enquiry form or admin login.

Content required:

- Foundation name: **Thulir Nrithyalaya Foundation**.
- Address: **8/332, 2nd Floor, Kambar Street, 2nd Main Road, Vijayanagaram, Santhosapuram, Medavakkam, Chennai, Tamil Nadu 600100**.
- Phone number: **+91 93846 45942**.
- Phone link: `tel:+919384645942`.
- WhatsApp link: `https://wa.me/919384645942`.
- Email address: **marai.jesu@gmail.com**.
- Email link: `mailto:marai.jesu@gmail.com`.
- Google Maps embed and external map link using the foundation address.
- No enquiry form is required for the first version.
- No visitor information capture system is required for the first version.

Map requirements:

- Show an embedded Google Map in the Contact section.
- Add a "Get Directions" button.
- The map should use this address:
  - `8/332, 2nd Floor, Kambar Street, 2nd Main Road, Vijayanagaram, Santhosapuram, Medavakkam, Chennai, Tamil Nadu 600100`
- Direction link format:
  - `https://www.google.com/maps/search/?api=1&query=8%2F332%2C%202nd%20Floor%2C%20Kambar%20Street%2C%202nd%20Main%20Road%2C%20Vijayanagaram%2C%20Santhosapuram%2C%20Medavakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600100`

## 6. Design Requirements

The design should feel classical, warm, and professional.

### Visual Direction

- Use real Bharatanatyam images from the foundation.
- Use a clean layout with enough spacing.
- Avoid too many animations.
- Use elegant Indian classical visual cues carefully, such as temple motifs, Nataraja references, or dance silhouettes.
- Keep the website professional and easy to read.

### Suggested Colors

- Deep maroon
- Gold
- Ivory / off-white
- Charcoal text

### Typography

- Use readable fonts.
- Suggested combinations:
  - Headings: Playfair Display, Cormorant Garamond, or Merriweather
  - Body: Inter, Lato, Open Sans, or system font

## 7. Technical Requirements

The website must be based on static HTML.

### Required Technologies

- HTML5
- CSS3
- Vanilla JavaScript only if needed
- No backend required for first version
- No heavy framework required

### Recommended File Structure

```text
website_new/
  index.html
  assets/
    homepage/
      001.jpg
      002.jpg
      homepage-data.js
      homepage.json
    THULIRNRITHYALAYA-FOUNDATION-Logo.png
    Homepage.jpg
    css/
      styles.css
    js/
      main.js
    images/
      hero.jpg
      gallery/
    gallery-source/
      performances/
        001.jpg
      guru/
        001.jpg
    gallery/
      optimized/
      thumbnails/
      gallery-data.js
      gallery.json
    events/
      2026/
        event-name_month/
          cover.jpg
          001.jpg
          002.jpg
          event.json
```

### Browser Support

- Chrome
- Safari
- Edge
- Firefox
- Android Chrome
- iPhone Safari

### Responsive Requirements

- Mobile-first layout.
- Works well at 360px mobile width.
- Navigation should collapse into a mobile menu.
- Images should resize without cropping important faces or dance poses.
- Text must not overlap on mobile.

### Performance Requirements

- Optimize images before upload.
- Use compressed JPG/WebP images where possible.
- Lazy-load gallery images.
- Keep page size light.
- Avoid unnecessary plugins.

### SEO Requirements

- Correct page title:
  - "Bharatanatyam Classes in Medavakkam, Chennai | Thulir Nrithyalaya Foundation"
- Meta description.
- Proper heading structure.
- Image alt text.
- Local keywords:
  - Bharatanatyam classes in Chennai
  - Bharatanatyam classes near Santhosapuram
  - Classical dance school in Chennai
  - Salangai Poojai training
  - Arangetram training

### Accessibility Requirements

- High contrast text.
- Keyboard-friendly navigation.
- Alt text for images.
- Clear focus states.
- Form labels for all fields.

## 8. Content Required From Foundation

Before development starts, collect:

- Official foundation name spelling.
- Logo: already available as `THULIRNRITHYALAYA-FOUNDATION-Logo.png`.
- Homepage image: already available as `Homepage.jpg`.
- Short biography for **Marai Mozhi Arasi J**: already provided and converted into website copy.
- Short biography for the family/founders, if needed.
- Correct phone number: **+91 93846 45942**.
- Correct email address: **marai.jesu@gmail.com**.
- Correct address: already provided.
- WhatsApp number: **+91 93846 45942**.
- Google Maps link or confirmation that the generated Google Maps search link is correct.
- 15-30 high-quality photos.
- Any awards, certificates, or press mentions.

## 9. Suggested Final Navigation

Recommended navigation labels:

- Home
- About
- Classes
- Events
- Gallery
- Contact

Optional later additions:

- Testimonials
- Blog
- Student Achievements

## 10. Launch Checklist

- Replace all old branding with "Thulir Nrithyalaya Foundation".
- Proofread all English content.
- Test the website on mobile and desktop.
- Check all phone, WhatsApp, email, and map links.
- Compress all images.
- Add favicon.
- Add SEO title and description.
- Add Google Analytics only if required.
- Upload files to hosting.
- Connect domain.
- Test the live website after deployment.

## 11. Recommended First Version Scope

For the first version, build:

- One-page HTML website.
- Modern responsive design.
- Home, About, Classes, Events, Gallery, Contact.
- WhatsApp and phone contact buttons.
- 12-18 selected gallery images.
- Year-wise events gallery folder system for ongoing event/photo updates.

This version can be launched quickly and expanded later.
