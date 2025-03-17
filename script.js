const clicker = document.getElementById("clicker");
const balanceDisplay = document.getElementById("balance");
const buyAutoClicker = document.getElementById("buy-autoclicker");
const buyUpgrade = document.getElementById("buy-upgrade");

let balance = 0;
let clickPower = 1;
let autoClicker = 0;

// Загрузка данных из Firebase
const userId = "test-user";  // Можно привязать к Telegram ID
const userRef = db.collection("users").doc(userId);

userRef.get().then((doc) => {
    if (doc.exists) {
        balance = doc.data().balance || 0;
        clickPower = doc.data().clickPower || 1;
        autoClicker = doc.data().autoClicker || 0;
        updateUI();
    }
});

// Функция обновления UI
function updateUI() {
    balanceDisplay.textContent = balance;
}

// Клик по криперу
clicker.addEventListener("click", () => {
    balance += clickPower;
    updateUI();
    saveData();
    spawnCreeper();
});

// Функция спауна криперов (анимация)
function spawnCreeper() {
    const creeper = document.createElement("img");
    creeper.src = "media/creeper.png";
    creeper.classList.add("animated-creeper");
    
    const container = document.getElementById("clicker-container");
    creeper.style.left = Math.random() * 100 + "px";
    container.appendChild(creeper);

    setTimeout(() => creeper.remove(), 1000);
}

// Покупка автокликера
buyAutoClicker.addEventListener("click", () => {
    if (balance >= 10) {
        balance -= 10;
        autoClicker += 1;
        updateUI();
        saveData();
    } else {
        alert("Не хватает криперов!");
    }
});

// Покупка улучшения клика
buyUpgrade.addEventListener("click", () => {
    if (balance >= 50) {
        balance -= 50;
        clickPower += 1;
        updateUI();
        saveData();
    } else {
        alert("Не хватает криперов!");
    }
});

// Автокликер
setInterval(() => {
    if (autoClicker > 0) {
        balance += autoClicker;
        updateUI();
        saveData();
    }
}, 1000);

// Функция сохранения данных в Firebase
function saveData() {
    userRef.set({
        balance: balance,
        clickPower: clickPower,
        autoClicker: autoClicker
    });
}
