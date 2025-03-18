let balance = 0;
let clickValue = 1;

const balanceElement = document.getElementById("balance");
const clicker = document.getElementById("clicker");
const buyAutoClicker = document.getElementById("buy-autoclicker");
const buyUpgrade = document.getElementById("buy-upgrade");
const menuButtons = document.querySelectorAll(".menu-btn");

// Функция для обновления баланса
function updateBalance() {
    balanceElement.textContent = balance;
}

// Анимация +1 при клике
function animateClick(x, y) {
    const plusOne = document.createElement("div");
    plusOne.textContent = `+${clickValue}`;
    plusOne.className = "plus-one";
    plusOne.style.left = `${x}px`;
    plusOne.style.top = `${y}px`;
    document.body.appendChild(plusOne);

    setTimeout(() => {
        plusOne.remove();
    }, 1000);
}

// Клик по криперу
clicker.addEventListener("click", (event) => {
    balance += clickValue;
    updateBalance();
    animateClick(event.clientX, event.clientY);
});

// Покупка автокликера
buyAutoClicker.addEventListener("click", () => {
    if (balance >= 10) {
        balance -= 10;
        updateBalance();
        setInterval(() => {
            balance += clickValue;
            updateBalance();
        }, 1000);
    }
});

// Улучшение клика
buyUpgrade.addEventListener("click", () => {
    if (balance >= 50) {
        balance -= 50;
        clickValue++;
        updateBalance();
    }
});

// Подсветка активной кнопки меню
menuButtons.forEach(button => {
    button.addEventListener("click", () => {
        menuButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});
