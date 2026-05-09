// ─── INVITE CONFIGURATION ────────────────────────────────────────────────────
// Edit this block to update all visible content on the page.
const config = {
  // Personal
  graduateName: "Đinh Ngọc Hiếu",
  signature: "Hiếu",
  academicYear: "Năm học 2021-2026",
  schoolName: "Học viện Công nghệ Bưu chính Viễn thông",

  // Event
  venueName: "Hội trường A2",
  date: "Thứ Bảy, 23.05.2026",
  time: "09:00",
  mapsUrl: "https://maps.app.goo.gl/64Fqv3pnPEsDey8f6",

  // Google Calendar (format: YYYYMMDDTHHMMSS)
  calendarStart: "20260523T090000",
  calendarEnd: "20260523T110000",
  timezone: "Asia/Ho_Chi_Minh",

  // Photo
  photoSrc: "./assets/graduation-hieungocdinh.png",
};
// ─────────────────────────────────────────────────────────────────────────────

// Derived / computed values (do not edit)
const data = {
  ...config,
  graduateNameUpper: config.graduateName.toLocaleUpperCase("vi-VN"),
  schoolNameUpper: config.schoolName.toLocaleUpperCase("vi-VN"),
  calendarTitle: `Lễ tốt nghiệp của ${config.graduateName}`,
  calendarDetails: `Trân trọng mời bạn đến dự lễ tốt nghiệp và cùng lưu lại những khoảnh khắc đáng nhớ trong ngày đặc biệt này.`,
  venueFull: `${config.venueName}, ${config.schoolName}`,
};

// ─── DOM BINDINGS ─────────────────────────────────────────────────────────────
function bindContent() {
  document.title = `Thiệp mời dự lễ tốt nghiệp | ${data.graduateName}`;

  const bindings = {
    posterEyebrow: "Trân trọng mời bạn",
    titleLine: "Buổi lễ",
    scriptTitle: "Tốt nghiệp",
    graduateNameUpper: data.graduateNameUpper,
    schoolNameUpper: data.schoolNameUpper,
    sideLabelLeft: data.academicYear,
    sideLabelRight: data.graduateNameUpper,
    detailTimeLabel: "Ngày & giờ",
    dateCompact: data.date,
    timeLabel: data.time,
    addCalendarLabel: "+ Thêm vào lịch",
    detailPlaceLabel: "Địa điểm",
    venueName: data.venueName,
    schoolName: data.schoolName,
    mapLinkLabel: "Google map",
    mainTitle: "Thiệp mời dự lễ tốt nghiệp",
    subTitle: ``,
    invitationText: data.calendarDetails,
    invitationSignaturePrefix: "Thân mời,",
    signature: data.signature,
    footerLine: "Hẹn gặp bạn trong ngày tốt nghiệp của tôi.",
    footerSubline: "From hieungocdinh with love ♥️",
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (Object.prototype.hasOwnProperty.call(bindings, key)) {
      el.textContent = bindings[key];
    }
  });

  const photo = document.getElementById("poster-photo");
  if (photo) {
    photo.src = data.photoSrc;
    photo.alt = `Ảnh minh họa tốt nghiệp của ${data.graduateName}`;
  }
}

// ─── EXTERNAL LINKS ───────────────────────────────────────────────────────────
function buildLinks() {
  const calendarLink = document.getElementById("calendar-link");
  if (calendarLink) {
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", data.calendarTitle);
    url.searchParams.set("dates", `${data.calendarStart}/${data.calendarEnd}`);
    url.searchParams.set("details", data.calendarDetails);
    url.searchParams.set("location", data.venueFull);
    url.searchParams.set("ctz", data.timezone);
    calendarLink.href = url.toString();
  }

  const mapsLink = document.getElementById("maps-link");
  if (mapsLink) mapsLink.href = data.mapsUrl;
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function setupReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function launchConfetti() {
  const layer = document.getElementById("confetti-layer");
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#d8b07a", "#e8d6bb", "#cfc5e6", "#f3e6d1"];

  ["left", "right"].forEach((side) => {
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement("span");
      const travelX = Math.random() * 18 + 48;

      piece.className = `confetti-piece confetti-piece--${side}`;
      piece.style.setProperty("--piece-color", colors[i % colors.length]);
      piece.style.setProperty("--origin-y", `${Math.random() * 18 + 4}vh`);
      piece.style.setProperty("--travel-x", side === "left" ? `${travelX}vw` : `-${travelX}vw`);
      piece.style.setProperty("--travel-y", `${Math.random() * 30 + 30}vh`);
      piece.style.setProperty("--rotate", `${Math.random() * 260 + 140}deg`);
      piece.style.setProperty("--duration", `${Math.random() * 1400 + 4200}ms`);
      piece.style.setProperty("--delay", `${Math.random() * 800}ms`);
      piece.style.setProperty("--size", `${Math.random() * 4 + 6}px`);

      piece.addEventListener("animationend", () => piece.remove(), { once: true });
      layer.appendChild(piece);
    }
  });
}

// ─── ENVELOPE OPEN INTERACTION ────────────────────────────────────────────────
function setupEnvelope() {
  const envelope = document.getElementById("envelope-overlay");

  if (!envelope) {
    // No envelope in DOM – reveal the card immediately
    document.body.classList.add("is-opened");
    launchConfetti();
    return;
  }

  envelope.addEventListener("click", () => {
    if (envelope.classList.contains("is-open")) return;

    envelope.classList.add("is-open");

    setTimeout(() => {
      document.body.classList.add("is-opened");
      envelope.classList.add("is-hidden");
      launchConfetti();
      setTimeout(() => envelope.remove(), 1500);
    }, 1600);
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  bindContent();
  buildLinks();
  setupReveal();
  setupEnvelope();
});