const navToggle = document.querySelector("[data-nav-toggle]");
const siteMenu = document.querySelector("[data-site-menu]");
const homepageHero = document.querySelector("[data-homepage-hero]");
const homepageCarousel = document.querySelector("[data-homepage-carousel]");
const gallery = document.querySelector("[data-gallery]");
const galleryFilters = document.querySelector("[data-gallery-filters]");
const galleryMore = document.querySelector("[data-gallery-more]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const eventArchive = document.querySelector("[data-event-archive]");
const eventList = document.querySelector("[data-event-list]");
const currentYear = document.querySelector("[data-current-year]");
const heroWhatsApp = document.querySelector(".hero-actions a[href*='wa.me']");
const floatingWhatsApp = document.querySelector(".floating-whatsapp");
const GALLERY_PAGE_SIZE = 12;

let galleryPhotos = [];
let activeGalleryCategory = "All";
let visibleGalleryCount = GALLERY_PAGE_SIZE;

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (heroWhatsApp && floatingWhatsApp && "IntersectionObserver" in window) {
  const heroActionObserver = new IntersectionObserver(
    ([entry]) => {
      floatingWhatsApp.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.25 },
  );
  heroActionObserver.observe(heroWhatsApp);
}

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

function closeMenu() {
  if (!siteMenu || !navToggle) return;
  siteMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = siteMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

function startHomepageSlider(slides) {
  if (!homepageHero || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let activeIndex = 0;
  let timerId;

  const showSlide = (nextIndex) => {
    slides[activeIndex]?.classList.remove("is-active");
    activeIndex = nextIndex % slides.length;
    slides[activeIndex]?.classList.add("is-active");
  };

  const start = () => {
    if (timerId) return;
    timerId = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 4500);
  };

  const stop = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = undefined;
  };

  homepageHero.addEventListener("pointerenter", stop);
  homepageHero.addEventListener("pointerleave", start);
  homepageHero.addEventListener("focusin", stop);
  homepageHero.addEventListener("focusout", start);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  start();
}

function renderHomepageSlider(images) {
  if (!homepageCarousel || !Array.isArray(images) || images.length === 0) return;

  homepageCarousel.replaceChildren();

  const slides = [];
  images.forEach((imageData, index) => {
    if (!imageData.src) return;

    const image = document.createElement("img");
    image.className = index === 0 ? "hero-slide is-active" : "hero-slide";
    image.src = imageData.src;
    image.alt = "";
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";
    image.draggable = false;

    homepageCarousel.append(image);
    slides.push(image);
  });

  startHomepageSlider(slides);
}

function openLightbox(src, caption) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
}

gallery?.addEventListener("click", (event) => {
  const item = event.target instanceof Element ? event.target.closest(".gallery-item") : null;
  if (!(item instanceof HTMLElement)) return;
  const src = item.dataset.full;
  const caption = item.dataset.caption || "Thulir Nrithyalaya Foundation gallery photo";
  if (src) openLightbox(src, caption);
});

function createGalleryItem(photo) {
  const src = photo.src || photo.thumb;
  if (!src) return null;

  const caption = photo.caption || photo.alt || "Thulir Nrithyalaya Foundation gallery photo";
  const alt = photo.alt || caption;

  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";
  button.dataset.full = src;
  button.dataset.caption = caption;

  const image = document.createElement("img");
  image.src = photo.thumb || src;
  image.alt = alt;
  image.loading = "lazy";
  image.draggable = false;

  const label = document.createElement("span");
  label.className = "gallery-label";
  label.textContent = photo.category || "Gallery";

  button.append(image, label);
  return button;
}

function getFilteredGalleryPhotos() {
  if (activeGalleryCategory === "All") return galleryPhotos;
  return galleryPhotos.filter((photo) => photo.category === activeGalleryCategory);
}

function updateGalleryView() {
  if (!gallery) return;

  const filteredPhotos = getFilteredGalleryPhotos();
  const visiblePhotos = filteredPhotos.slice(0, visibleGalleryCount);
  gallery.replaceChildren();

  visiblePhotos.forEach((photo) => {
    const item = createGalleryItem(photo);
    if (item) gallery.append(item);
  });

  if (galleryMore) {
    galleryMore.hidden = filteredPhotos.length <= visibleGalleryCount;
  }
}

function buildGalleryFilters() {
  if (!galleryFilters) return;

  const categories = [...new Set(galleryPhotos.map((photo) => photo.category).filter(Boolean))];
  galleryFilters.replaceChildren();

  if (categories.length < 2) {
    galleryFilters.hidden = true;
    return;
  }

  ["All", ...categories].forEach((category) => {
    const button = document.createElement("button");
    const isActive = category === activeGalleryCategory;
    button.type = "button";
    button.className = isActive ? "gallery-filter is-active" : "gallery-filter";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(isActive));

    button.addEventListener("click", () => {
      activeGalleryCategory = category;
      visibleGalleryCount = GALLERY_PAGE_SIZE;
      buildGalleryFilters();
      updateGalleryView();
    });

    galleryFilters.append(button);
  });

  galleryFilters.hidden = false;
}

function renderGallery(photos) {
  if (!gallery || !Array.isArray(photos) || photos.length === 0) return;

  galleryPhotos = photos.filter((photo) => photo.src || photo.thumb);
  activeGalleryCategory = "All";
  visibleGalleryCount = GALLERY_PAGE_SIZE;
  buildGalleryFilters();
  updateGalleryView();
}

galleryMore?.addEventListener("click", () => {
  visibleGalleryCount += GALLERY_PAGE_SIZE;
  updateGalleryView();
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeMenu();
  }
});

function renderEvents(events) {
  if (!eventArchive || !eventList || !Array.isArray(events) || events.length === 0) return;

  const sortedEvents = [...events].sort((a, b) => {
    const yearDiff = Number(b.year || 0) - Number(a.year || 0);
    if (yearDiff !== 0) return yearDiff;
    return String(b.month || "").localeCompare(String(a.month || ""));
  });

  eventList.replaceChildren();
  eventArchive.hidden = false;

  sortedEvents.forEach((event) => {
    const cover = event.cover || "assets/images/performance.jpg";
    const title = event.title || "Thulir Nrithyalaya Foundation Event";
    const period = [event.month, event.year].filter(Boolean).join(" ") || "Event";
    const description = event.description || "Bharatanatyam event photos from Thulir Nrithyalaya Foundation.";

    const article = document.createElement("article");
    article.className = "event-card";

    const image = document.createElement("img");
    image.src = cover;
    image.alt = title;
    image.loading = "lazy";
    image.draggable = false;

    const body = document.createElement("div");

    const date = document.createElement("p");
    date.className = "eyebrow";
    date.textContent = period;

    const heading = document.createElement("h4");
    heading.textContent = title;

    const copy = document.createElement("p");
    copy.textContent = description;

    body.append(date, heading, copy);
    article.append(image, body);
    eventList.append(article);
  });
}

async function loadEvents() {
  try {
    const response = await fetch("assets/events/events.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    renderEvents(data.events);
  } catch {
    // The site still works when opened directly from the filesystem.
  }
}

async function loadGallery() {
  if (window.THULIR_GALLERY?.photos) {
    renderGallery(window.THULIR_GALLERY.photos);
    return;
  }

  try {
    const response = await fetch("assets/gallery/gallery.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    renderGallery(data.photos);
  } catch {
    // The static fallback message remains visible if the gallery data cannot be loaded.
  }
}

async function loadHomepageSlider() {
  if (window.THULIR_HOMEPAGE?.images) {
    renderHomepageSlider(window.THULIR_HOMEPAGE.images);
    return;
  }

  try {
    const response = await fetch("assets/homepage/homepage.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    renderHomepageSlider(data.images);
  } catch {
    // The fallback hero image remains visible if homepage data cannot be loaded.
  }
}

loadHomepageSlider();
loadGallery();
loadEvents();
