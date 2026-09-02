import { plans } from "./plans.js";

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const year = document.querySelector("#year");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const setNav = (open) => {
  toggle?.setAttribute("aria-expanded", String(open));
  toggle?.setAttribute("aria-label", open ? "Menyunu bağla" : "Menyunu aç");
  document.body.classList.toggle("nav-open", open);
};

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  setNav(!open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  },
  { passive: true },
);

const waFloat = document.querySelector(".wa-float");
const contact = document.querySelector("#elaqe");
if (waFloat && contact && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      waFloat.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.35 },
  );
  observer.observe(contact);
}

const pad = (value) => String(value).padStart(2, "0");

const grid = document.querySelector("#plan-grid");
if (grid) {
  grid.innerHTML = plans
    .map(
      (plan, index) => `
      <article class="plan-card" data-reveal style="--d:${index * 90}ms">
        <button class="plan-card-btn" type="button" data-open-plan="${plan.id}" aria-label="${plan.name}, ${plan.pages.length} vərəq">
          <div class="plan-stack">
            <div class="plan-stack-sheet" aria-hidden="true">${plan.pages[0].svg}</div>
          </div>
          <div class="plan-card-body">
            <p class="plan-card-tag">${plan.tag}</p>
            <h3>${plan.name}</h3>
            <p class="plan-card-meta">${plan.place}</p>
            <p class="plan-card-blurb">${plan.blurb}</p>
            <p class="plan-card-pages">${plan.pages.length} vərəq · açın</p>
          </div>
        </button>
      </article>
    `,
    )
    .join("");
}

const reveals = document.querySelectorAll("[data-reveal]");
if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-in"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );
  reveals.forEach((el) => revealObserver.observe(el));
}

const viewer = document.querySelector("#plan-viewer");
const sheetEl = document.querySelector("#viewer-sheet");
const thumbsEl = document.querySelector("#viewer-thumbs");
const titleEl = document.querySelector("#viewer-title");
const kickerEl = document.querySelector("#viewer-kicker");
const pageTitleEl = document.querySelector("#viewer-page-title");
const counterEl = document.querySelector("#viewer-counter");
const waEl = document.querySelector("#viewer-wa");
const prevBtn = document.querySelector(".viewer-prev");
const nextBtn = document.querySelector(".viewer-next");
const closeBtn = document.querySelector(".viewer-close");
const stage = document.querySelector("#viewer-stage");

let activePlan = null;
let pageIndex = 0;
let animating = false;
let lastTrigger = null;

const renderThumbs = () => {
  if (!thumbsEl || !activePlan) return;
  thumbsEl.innerHTML = activePlan.pages
    .map(
      (page, index) => `
      <button
        class="viewer-thumb${index === pageIndex ? " is-active" : ""}"
        type="button"
        data-page="${index}"
        aria-label="${page.title}"
        ${index === pageIndex ? 'aria-current="true"' : ""}
      >
        ${page.svg}
      </button>
    `,
    )
    .join("");
};

const updateMeta = () => {
  if (!activePlan) return;
  const page = activePlan.pages[pageIndex];
  const total = activePlan.pages.length;
  kickerEl.textContent = activePlan.place;
  titleEl.textContent = activePlan.name;
  pageTitleEl.textContent = page.title;
  counterEl.textContent = `${pad(pageIndex + 1)} / ${pad(total)}`;
  prevBtn.disabled = pageIndex === 0;
  nextBtn.disabled = pageIndex === total - 1;
  waEl.href = `https://wa.me/994500000000?text=${encodeURIComponent(
    `Salam, «${activePlan.name}» nümunəsinə oxşar eskiz istəyirəm.`,
  )}`;
  thumbsEl?.querySelectorAll(".viewer-thumb").forEach((thumb, index) => {
    const active = index === pageIndex;
    thumb.classList.toggle("is-active", active);
    if (active) thumb.setAttribute("aria-current", "true");
    else thumb.removeAttribute("aria-current");
  });
};

const paintSheet = (direction = 0) => {
  if (!sheetEl || !activePlan) return;
  const page = activePlan.pages[pageIndex];

  if (reduceMotion || !direction) {
    sheetEl.style.setProperty("--sheet-x", "0px");
    sheetEl.innerHTML = page.svg;
    sheetEl.classList.remove("is-out");
    sheetEl.classList.add("is-in");
    updateMeta();
    return;
  }

  animating = true;
  const outX = direction > 0 ? "-28px" : "28px";
  const inX = direction > 0 ? "28px" : "-28px";
  sheetEl.style.setProperty("--sheet-x", outX);
  sheetEl.classList.remove("is-in");
  sheetEl.classList.add("is-out");

  window.setTimeout(() => {
    sheetEl.innerHTML = page.svg;
    sheetEl.style.setProperty("--sheet-x", inX);
    sheetEl.classList.remove("is-out");
    requestAnimationFrame(() => {
      sheetEl.classList.add("is-in");
      animating = false;
    });
    updateMeta();
  }, 220);
};

const goTo = (index, direction = 0) => {
  if (!activePlan || animating) return;
  const next = Math.max(0, Math.min(activePlan.pages.length - 1, index));
  if (next === pageIndex && sheetEl.innerHTML) return;
  const dir = direction || (next > pageIndex ? 1 : next < pageIndex ? -1 : 0);
  pageIndex = next;
  updateMeta();
  paintSheet(dir);
};

const openPlan = (id, trigger) => {
  activePlan = plans.find((plan) => plan.id === id) ?? null;
  if (!activePlan || !viewer) return;
  lastTrigger = trigger ?? null;
  pageIndex = 0;
  renderThumbs();
  paintSheet(0);
  updateMeta();
  if (typeof viewer.showModal === "function") {
    viewer.showModal();
  }
};

const closeViewer = () => {
  viewer?.close();
  lastTrigger?.focus();
};

grid?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-plan]");
  if (!button) return;
  openPlan(button.dataset.openPlan, button);
});

prevBtn?.addEventListener("click", () => goTo(pageIndex - 1, -1));
nextBtn?.addEventListener("click", () => goTo(pageIndex + 1, 1));
closeBtn?.addEventListener("click", closeViewer);

thumbsEl?.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-page]");
  if (!thumb) return;
  goTo(Number(thumb.dataset.page));
});

viewer?.addEventListener("click", (event) => {
  if (event.target === viewer) closeViewer();
});

window.addEventListener("keydown", (event) => {
  if (viewer?.open) {
    if (event.key === "ArrowRight") goTo(pageIndex + 1, 1);
    if (event.key === "ArrowLeft") goTo(pageIndex - 1, -1);
    return;
  }
  if (event.key === "Escape") setNav(false);
});

if (stage) {
  let startX = 0;
  stage.addEventListener(
    "pointerdown",
    (event) => {
      startX = event.clientX;
    },
    { passive: true },
  );
  stage.addEventListener("pointerup", (event) => {
    const dx = event.clientX - startX;
    if (dx > 56) goTo(pageIndex - 1, -1);
    if (dx < -56) goTo(pageIndex + 1, 1);
  });
}
