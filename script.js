// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Floating pill navbar active link on scroll
const fnavLinks = document.querySelectorAll(".fnav-link");
const navTargets = Array.from(fnavLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        fnavLinks.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

navTargets.forEach((section) => navObserver.observe(section));

// Interactive 3D swing/tilt on hanging lanyard ID card
const lanyardCard = document.getElementById("lanyardCard");
if (lanyardCard) {
  lanyardCard.addEventListener("mousemove", (e) => {
    const rect = lanyardCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    lanyardCard.style.transform = `rotate(${(-5 + x * 8).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
  });

  lanyardCard.addEventListener("mouseleave", () => {
    lanyardCard.style.transform = "rotate(-5deg)";
  });
}

// Portfolio Showcase Tabs
const showcaseTabs = document.querySelectorAll(".showcase-tab");
const tabPanels = document.querySelectorAll(".tab-panel");

function activateTab(tabId) {
  showcaseTabs.forEach((t) => {
    const isMatch = t.dataset.tab === tabId;
    t.classList.toggle("active", isMatch);
    t.setAttribute("aria-selected", String(isMatch));
  });
  tabPanels.forEach((panel) => {
    const isMatch = panel.id === tabId;
    panel.hidden = !isMatch;
    panel.classList.toggle("active", isMatch);
  });
}

showcaseTabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

document.querySelectorAll("[data-tab-link]").forEach((link) => {
  link.addEventListener("click", () => {
    activateTab(link.dataset.tabLink);
  });
});

// Project "Details →" toggle
const toggleProjectDetails = document.getElementById("toggleProjectDetails");
const projectExtra = document.getElementById("projectExtra");

toggleProjectDetails.addEventListener("click", () => {
  const isHidden = projectExtra.hidden;
  projectExtra.hidden = !isHidden;
  toggleProjectDetails.textContent = isHidden ? "Hide Details" : "Details →";
});

// Certificate Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");

document.querySelectorAll(".cert-tile").forEach((btn) => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.cert;
    lightboxImg.alt = btn.dataset.title;
    lightboxTitle.textContent = btn.dataset.title;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
