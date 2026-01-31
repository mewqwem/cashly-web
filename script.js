"use strict";

const btnAdd = document.getElementById("addBtn");
const modalWindow = document.getElementById("modalBackdrop");

btnAdd.onclick = () => {
  modalWindow.classList.toggle("is-open");
};

modalWindow.onclick = (event) => {
  if (event.target === modalWindow) {
    modalWindow.classList.remove("is-open");
  }
};
