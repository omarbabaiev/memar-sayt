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
const closeBtn = document.querySelector("#plan-viewer .viewer-close");
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

const WA_PHONE = "994500000000";
const GREET_KEY = "memar-greet";
const greet = document.querySelector("#wa-greet");
const greetThread = document.querySelector("#wa-greet-thread");
const greetFoot = document.querySelector("#wa-greet-foot");
const greetClose = document.querySelector(".wa-greet-close");

const greetSteps = [
  {
    bot: "Salam. Nə üçün eskiz lazımdır?",
    key: "need",
    choices: [
      { label: "Kupça / çıxarış", value: "kupça (çıxarış)" },
      { label: "Yeni ev", value: "yeni ev — məlumatlandırma" },
      { label: "Tikinti icazəsi", value: "tikinti icazəsi" },
      { label: "3D / fasad", value: "3D və fasad" },
      { label: "Hələ baxıram", value: "ümumi məlumat" },
    ],
  },
  {
    bot: "Sahə haradadır?",
    key: "place",
    choices: [
      { label: "Bakı", value: "Bakı" },
      { label: "Masazır / Mehdiabad", value: "Masazır / Mehdiabad" },
      { label: "Binə / Hövsan", value: "Binə / Hövsan" },
      { label: "Mərdəkan / Şüvəlan", value: "Mərdəkan / Şüvəlan" },
      { label: "Başqa", value: "başqa rayon" },
    ],
  },
  {
    bot: "Təxmini sahə?",
    key: "size",
    choices: [
      { label: "100 m²-ə qədər", value: "100 m²-ə qədər" },
      { label: "100–200 m²", value: "100–200 m²" },
      { label: "200–350 m²", value: "200–350 m²" },
      { label: "350+ m²", value: "350 m²-dən böyük" },
      { label: "Dəqiq bilmirəm", value: "dəqiq bilinmir" },
    ],
  },
];

const greetStorage = {
  get() {
    try {
      return sessionStorage.getItem(GREET_KEY);
    } catch {
      return null;
    }
  },
  set(value) {
    try {
      sessionStorage.setItem(GREET_KEY, value);
    } catch {
      /* private mode */
    }
  },
};

const greetWait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : ms));

let greetAlive = false;
const answers = {};

const scrollGreet = () => {
  if (!greetThread) return;
  greetThread.scrollTop = greetThread.scrollHeight;
};

const addBubble = (role, text) => {
  if (!greetThread) return;
  const p = document.createElement("p");
  p.className = `wa-bubble wa-bubble-${role}`;
  p.textContent = text;
  greetThread.appendChild(p);
  scrollGreet();
  return p;
};

const addTyping = () => {
  if (!greetThread) return null;
  const el = document.createElement("p");
  el.className = "wa-bubble wa-bubble-bot wa-typing";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = "<span></span><span></span><span></span>";
  greetThread.appendChild(el);
  scrollGreet();
  return el;
};

const speak = async (text) => {
  const typing = addTyping();
  await greetWait(480);
  if (!greetAlive) return;
  typing?.remove();
  addBubble("bot", text);
};

const renderChoices = (choices) => {
  if (!greetFoot) return;
  greetFoot.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "wa-greet-choices";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Cavab seçimləri");
  choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wa-choice";
    btn.textContent = choice.label;
    btn.dataset.value = choice.value;
    btn.dataset.label = choice.label;
    wrap.appendChild(btn);
    if (index === 0) {
      requestAnimationFrame(() => btn.focus());
    }
  });
  greetFoot.appendChild(wrap);
};

const renderCta = () => {
  if (!greetFoot) return;
  const text = `Salam. Eskiz: ${answers.need}. Sahə: ${answers.place}. Ölçü: ${answers.size}.`;
  const href = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
  greetFoot.innerHTML = `
    <div class="wa-greet-cta">
      <a class="btn btn-gold" href="${href}" target="_blank" rel="noopener noreferrer" data-greet-wa>
        WhatsApp-a yazın
      </a>
      <button class="wa-stay" type="button">Saytda qalın</button>
    </div>
  `;
  greetFoot.querySelector("[data-greet-wa]")?.focus();
};

const askStep = async (index) => {
  if (!greetAlive) return;
  const step = greetSteps[index];
  await speak(step.bot);
  if (!greetAlive) return;
  renderChoices(step.choices);
};

const finishGreet = async () => {
  if (!greetAlive) return;
  await speak("Mesaj hazırdır. Göndərin — qiyməti WhatsApp-da dəqiqləşdirək.");
  if (!greetAlive) return;
  renderCta();
};

const closeGreet = (reason = "dismissed") => {
  greetAlive = false;
  greetStorage.set(reason);
  if (!greet?.open) return;
  window.setTimeout(() => {
    if (greet.open) greet.close();
  }, 140);
};

const startGreet = async () => {
  if (!greet || typeof greet.showModal !== "function" || greet.open) return;
  greetAlive = true;
  Object.keys(answers).forEach((key) => delete answers[key]);
  greetThread.innerHTML = "";
  greetFoot.innerHTML = "";
  greet.showModal();
  await askStep(0);
};

greetFoot?.addEventListener("click", async (event) => {
  const stay = event.target.closest(".wa-stay");
  if (stay) {
    event.preventDefault();
    closeGreet("dismissed");
    return;
  }

  const wa = event.target.closest("[data-greet-wa]");
  if (wa) {
    closeGreet("sent");
    return;
  }

  const choice = event.target.closest(".wa-choice");
  if (!choice || !greetAlive) return;

  const answered = greetSteps.find((step) => !(step.key in answers));
  if (!answered) return;

  answers[answered.key] = choice.dataset.value;
  greetFoot.innerHTML = "";
  addBubble("user", choice.dataset.label);

  const nextIndex = greetSteps.findIndex((step) => !(step.key in answers));
  if (nextIndex === -1) {
    await finishGreet();
    return;
  }
  await greetWait(220);
  await askStep(nextIndex);
});

greetClose?.addEventListener("click", () => closeGreet("dismissed"));

greet?.addEventListener("click", (event) => {
  if (event.target === greet) closeGreet("dismissed");
});

greet?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeGreet("dismissed");
});

const shouldOpenGreet = () => {
  if (greetStorage.get()) return false;
  const hash = window.location.hash;
  if (hash && hash !== "#" && hash !== "#esas") return false;
  return true;
};

if (shouldOpenGreet()) {
  window.setTimeout(() => {
    if (shouldOpenGreet() && !viewer?.open) startGreet();
  }, reduceMotion ? 200 : 1100);
}
