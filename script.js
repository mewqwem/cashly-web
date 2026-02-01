"use strict";

//! MODAL CLOSE/OPEN LOGIC

const btnAdd = document.getElementById("addBtn");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModalBtn");

const closeModal = () => {
  modalBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
};

btnAdd.onclick = () => {
  modalBackdrop.classList.toggle("is-open");

  document.body.style.overflow = "hidden";
};

closeModalBtn.onclick = closeModal;

modalBackdrop.onclick = (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
};
