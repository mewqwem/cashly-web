"use strict";

let transactions = [];

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

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

//! MODAL FORM LOGIC
const addButtonTransaction = document.getElementById("addTransactionBtn");
const historyList = document.getElementById("historyList");

addButtonTransaction.onclick = function () {
  const transactionData = collectFormData();

  if (isNaN(transactionData.amount) || transactionData.desc.trim() === "") {
    console.log("Please fill all inputs correctly");
    return;
  }

  transactions.push(transactionData);
  renderTemplate(transactionData);
  updateBalance();
  saveToLocalStorage();
  clearForm();
};

function updateBalance() {
  const balanceElement = document.getElementById("totalBalance");

  const total = transactions.reduce((acc, item) => {
    return item.type === "income" ? acc + item.amount : acc - item.amount;
  }, 0);
  balanceElement.textContent = `${total >= 0 ? "$" : "-$"}${Math.abs(total).toFixed(2)}`;
}

function collectFormData() {
  const amount = document.getElementById("amount").value;
  const desc = document.getElementById("description").value;
  const category = document.getElementById("categorySelect").value;
  const transactionType = document.querySelector(
    "input[name = transactionType]:checked",
  ).value;

  return {
    id: Date.now(),
    amount: parseFloat(amount),
    type: transactionType,
    category: category,
    desc: desc,
  };
}
function renderTemplate(data) {
  const isIncome = data.type === "income";
  const amountClass = isIncome ? "income-value" : "expenses-value";
  const sign = isIncome ? "+$" : "-$";

  const li = document.createElement("li");
  li.className = "history-item";

  li.innerHTML = `
  <div class="history-item-wrapper">
    <h3 class="history-item-title">${data.category}</h3>
    <p class="history-item-description">${data.desc}</p>
  </div>
    <p class="history-item-amount ${amountClass}">${sign}${Math.abs(data.amount).toFixed(2)}</p>
  `;

  historyList.prepend(li);
}

function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
}

// function addTransaction() {
//   const amount = document.getElementById("amount").value;
//   const desc = document.getElementById("description").value;
//   const category = document.getElementById("");
//   const transactionType = document.querySelector(
//     "input[name = transactionType]:checked",
//   ).value;

//   const transaction = {
//     id: Date.now(),
//     amount: parseFloat(amount),
//     type: transactionType,
//     category: category,
//     desc: desc,
//   };

//   return transaction;
// }
function init() {
  const savedData = localStorage.getItem("transactions");

  if (savedData) {
    transactions = JSON.parse(savedData);

    transactions.forEach((item) => renderTemplate(item));

    updateBalance();
  }
}

init();
