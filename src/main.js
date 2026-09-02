const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const year = document.querySelector("#year");

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

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNav(false);
});
