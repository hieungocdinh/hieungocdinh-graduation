const inviteConfig = {
  // TODO: sửa [TÊN CỦA TÔI] tại đây.
  graduateName: "Đinh Ngọc Hiếu",

  // TODO: sửa tiêu đề hiển thị nếu bạn muốn đổi nội dung thiệp.
  mainTitle: "Thiệp mời dự lễ tốt nghiệp",
  subTitle: "Trân trọng mời bạn đến chung vui trong ngày tốt nghiệp của tôi",

  // TODO: sửa [Tên trường] tại đây.
  schoolName: "Học viện Công nghệ Bưu chính Viễn thông",

  // TODO: sửa địa điểm tổ chức tại đây.
  venueName: "Hội trường A",

  // TODO: sửa địa chỉ thật tại đây.
  addressLabel: "km10, Đường Nguyễn Trãi, P. Mộ Lao, Quận Hà Đông, Hà Nội",

  // TODO: sửa ngày giờ hiển thị tại đây.
  dateLabel: "Chủ nhật, 15 tháng 06 năm 2026",
  timeLabel: "08:00",

  // TODO: sửa ngày giờ Google Calendar tại đây theo định dạng YYYYMMDDTHHMMSS.
  calendarStart: "20260615T080000",
  calendarEnd: "20260615T110000",
  timezone: "Asia/Ho_Chi_Minh",

  invitationText:
    "Sau một hành trình nhiều kỷ niệm, tôi rất vui khi được mời bạn đến dự lễ tốt nghiệp và cùng lưu lại những khoảnh khắc đáng nhớ trong ngày đặc biệt này.",

  // TODO: sửa chữ ký hiển thị tại đây.
  signature: "Hiếu",

  mapsUrl: "https://maps.app.goo.gl/64Fqv3pnPEsDey8f6",
};

const storageKey = "graduationInviteWishesDemo";

inviteConfig.venueFull = `${inviteConfig.venueName}, Trường ${inviteConfig.schoolName}`;
inviteConfig.calendarTitle = `Lễ tốt nghiệp của ${inviteConfig.graduateName}`;
inviteConfig.calendarDetails = `${inviteConfig.subTitle}\n\n${inviteConfig.invitationText}`;

function bindInviteContent() {
  document.title = `${inviteConfig.mainTitle} | ${inviteConfig.graduateName}`;

  const bindings = {
    mainTitle: inviteConfig.mainTitle,
    graduateName: inviteConfig.graduateName,
    subTitle: inviteConfig.subTitle,
    dateLabel: inviteConfig.dateLabel,
    timeLabel: inviteConfig.timeLabel,
    venueFull: inviteConfig.venueFull,
    addressLabel: inviteConfig.addressLabel,
    invitationText: `“${inviteConfig.invitationText}”`,
    signature: inviteConfig.signature,
  };

  document.querySelectorAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;

    if (Object.prototype.hasOwnProperty.call(bindings, key)) {
      element.textContent = bindings[key];
    }
  });
}

function setupSmoothScroll() {
  const trigger = document.getElementById("scroll-to-invite");
  const target = document.getElementById("event-info");

  if (!trigger || !target) {
    return;
  }

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function buildCalendarLink() {
  const calendarUrl = new URL("https://calendar.google.com/calendar/render");
  const fullLocation = `${inviteConfig.venueFull}, ${inviteConfig.addressLabel}`;

  calendarUrl.searchParams.set("action", "TEMPLATE");
  calendarUrl.searchParams.set("text", inviteConfig.calendarTitle);
  calendarUrl.searchParams.set("dates", `${inviteConfig.calendarStart}/${inviteConfig.calendarEnd}`);
  calendarUrl.searchParams.set("details", inviteConfig.calendarDetails);
  calendarUrl.searchParams.set("location", fullLocation);
  calendarUrl.searchParams.set("ctz", inviteConfig.timezone);

  const calendarLink = document.getElementById("calendar-link");
  const mapsLink = document.getElementById("maps-link");

  if (calendarLink) {
    calendarLink.href = calendarUrl.toString();
  }

  if (mapsLink) {
    mapsLink.href = inviteConfig.mapsUrl;
  }
}

function loadWishes() {
  try {
    const rawData = localStorage.getItem(storageKey);
    const parsedData = rawData ? JSON.parse(rawData) : [];

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    return [];
  }
}

function saveWishes(wishes) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(wishes));
    return true;
  } catch (error) {
    return false;
  }
}

function formatWishTime(createdAt) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Vừa ghi nhận";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function renderWishes(wishes) {
  const wishesList = document.getElementById("wishes-list");
  const emptyState = document.getElementById("wishes-empty");
  const clearButton = document.getElementById("clear-wishes");

  if (!wishesList || !emptyState || !clearButton) {
    return;
  }

  wishesList.innerHTML = "";

  if (wishes.length === 0) {
    emptyState.hidden = false;
    clearButton.disabled = true;
    return;
  }

  emptyState.hidden = true;
  clearButton.disabled = false;

  wishes
    .slice()
    .reverse()
    .forEach((wish) => {
      const item = document.createElement("article");
      item.className = "wish-item";

      const guestName = document.createElement("h4");
      guestName.textContent = wish.name;

      const message = document.createElement("p");
      message.textContent = wish.message || "Một lời chúc ngắn gọn nhưng rất đáng quý.";

      const time = document.createElement("span");
      time.className = "wish-item__time";
      time.textContent = formatWishTime(wish.createdAt);

      item.append(guestName, message, time);
      wishesList.appendChild(item);
    });
}

function setFormStatus(message, isError = false) {
  const statusElement = document.getElementById("form-status");

  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.style.color = isError ? "#b33a3a" : "";
}

function setupWishForm() {
  const form = document.getElementById("wish-form");
  const nameInput = document.getElementById("guest-name");
  const messageInput = document.getElementById("guest-message");
  const clearButton = document.getElementById("clear-wishes");

  if (!form || !nameInput || !messageInput || !clearButton) {
    return;
  }

  let wishes = loadWishes();
  renderWishes(wishes);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const guestName = nameInput.value.trim();
    const guestMessage = messageInput.value.trim();

    if (!guestName) {
      setFormStatus("Vui lòng nhập tên khách mời trước khi gửi lời chúc.", true);
      nameInput.focus();
      return;
    }

    wishes.push({
      name: guestName,
      message: guestMessage,
      createdAt: new Date().toISOString(),
    });

    const isSaved = saveWishes(wishes);

    if (!isSaved) {
      wishes.pop();
      setFormStatus("Trình duyệt đang chặn lưu demo. Hãy thử lại sau.", true);
      return;
    }

    renderWishes(wishes);
    form.reset();
    setFormStatus("Cảm ơn bạn, lời chúc đã được ghi nhận trong bản demo.");
  });

  clearButton.addEventListener("click", () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      setFormStatus("Không thể xóa lời chúc demo trên trình duyệt này.", true);
      return;
    }

    wishes = [];
    renderWishes(wishes);
    setFormStatus("Đã xóa toàn bộ lời chúc demo trên trình duyệt này.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindInviteContent();
  setupSmoothScroll();
  setupRevealAnimation();
  buildCalendarLink();
  setupWishForm();
});
