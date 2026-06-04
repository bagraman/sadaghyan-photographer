// Словарь переводов
const translations = {
  ru: {
    hero_title: "Сохраню ваши яркие воспоминания",
    hero_subtitle: "Свадьбы • Крещение • Семейные • Фотосессии",
    cta_btn: "Смотреть работы",
    portfolio_title: "Портфолио",
    filter_all: "Все",
    filter_wedding: "Свадьбы",
    filter_baptism: "Крещение",
    filter_family: "Семейные",
    filter_street: "Фотосессии",
    contact_title: "Связаться со мной",
  },
  am: {
    hero_title: "Ես կպահեմ Ձեր վառ հիշողությունները",
    hero_subtitle: "Հարսանիքներ • Մկրտություն • նտանեկան • ֆոտոսեսիաներ",
    cta_btn: "Դիտել աշխատանքները",
    portfolio_title: "Պորտֆոլիո",
    filter_all: "Բոլորը",
    filter_wedding: "Հարսանիքներ",
    filter_baptism: "Մկրտություն",
    filter_family: "Ընտանեկան",
    filter_street: "ֆոտոսեսիաներ",
    contact_title: "Կապվել ին հետ",
  },
};

const langToggle = document.getElementById("lang-toggle");
let currentLang = localStorage.getItem("lang") || "ru";

// Функция применения языка
function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Меняем текст кнопки на ПРОТИВОПОЛОЖНЫЙ язык
  langToggle.textContent = lang === "ru" ? "AM" : "RU";
  localStorage.setItem("lang", lang);
  currentLang = lang;
}

// Слушатель клика
langToggle.addEventListener("click", () => {
  const newLang = currentLang === "ru" ? "am" : "ru";
  applyLanguage(newLang);
});

// Применяем при загрузке
applyLanguage(currentLang);

// Простая фильтрация (без анимации пока)
document.querySelectorAll(".filter-buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelector(".filter-buttons .active")
      .classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".photo-item").forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
let visibleImages = [];
let currentIndex = 0;

// === LIGHTBOX (ИСПРАВЛЕННАЯ ВЕРСИЯ) ===
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(images, index) {
    if (!images || images.length === 0) return;
    currentImages = images;
    currentIndex = index;
    lightboxImg.src = currentImages[currentIndex].src;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = ""; // Возвращаем скролл
  }

  function navigate(step) {
    if (currentImages.length === 0) return;
    currentIndex =
      (currentIndex + step + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  }

  // 1. Вешаем клик на все фото в галерее
  document.querySelectorAll(".photo-item").forEach((item) => {
    const img = item.querySelector("img");
    img.style.cursor = "pointer"; // Показываем, что можно кликать

    img.addEventListener("click", () => {
      // Берем только ВИДИМЫЕ блоки в момент клика
      const visibleItems = Array.from(
        document.querySelectorAll(".photo-item"),
      ).filter((i) => !i.classList.contains("hidden"));
      const visibleImgs = visibleItems.map((i) => i.querySelector("img"));
      const idx = visibleItems.indexOf(item);

      if (idx !== -1) {
        openLightbox(visibleImgs, idx);
      }
    });
  });

  // 2. Кнопки управления
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox(); // Закрытие по клику на фон
  });
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));

  // 3. Клавиатура
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    }
  });

  console.log("✅ Lightbox инициализирован"); // Для проверки в консоли
});
