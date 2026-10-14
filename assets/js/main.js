/* Небольшие улучшения. Все страницы и ссылки работают и без JavaScript. */
"use strict";
const filters = document.querySelector("#catalog-filters");
if (filters) {
  filters.hidden = false;
  const cards = [...document.querySelectorAll(".model-card")];
  filters.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const choice = button.dataset.filter;
      filters.querySelectorAll("[data-filter]").forEach(item => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      cards.forEach(card => {
        card.hidden = choice !== "all" && card.dataset.status !== choice;
      });
      document.querySelector("#filter-count").textContent =
        "Показано моделей: " + cards.filter(card => !card.hidden).length;
    });
  });
}
const modelMenu = document.querySelector(".model-navigation");
if (modelMenu && window.matchMedia("(max-width: 760px)").matches) {
  modelMenu.open = false;
}
const photoDialog = document.querySelector("#photo-dialog");
if (photoDialog && typeof photoDialog.showModal === "function") {
  let lastPhoto = null;
  document.querySelectorAll("[data-photo]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      lastPhoto = link;
      const image = document.querySelector("#large-photo");
      image.src = link.href;
      image.alt = link.dataset.caption;
      document.querySelector("#photo-title").textContent = link.dataset.caption;
      photoDialog.showModal();
    });
  });
  document.querySelector("#close-photo").addEventListener("click", () => photoDialog.close());
  photoDialog.addEventListener("close", () => {
    if (lastPhoto) lastPhoto.focus();
  });
  photoDialog.addEventListener("click", event => {
    if (event.target === photoDialog) photoDialog.close();
  });
}
