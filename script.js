import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Конфигурация Firebase (замени на свои данные)
const firebaseConfig = {
  apiKey: "AIzaSyD3iOFYfxPQQ7SBf9-O844Zv4BuilYeP44",
  authDomain: "creeper-clicker.firebaseapp.com",
  projectId: "creeper-clicker",
  storageBucket: "creeper-clicker.firebasestorage.app",
  messagingSenderId: "930295002436",
  appId: "1:930295002436:web:4bfa047e115b8b8cb55311",
  measurementId: "G-2R4CBD84YX"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML элементы
const creeper = document.getElementById("creeper");
const balanceDisplay = document.getElementById("balance");
const upgradeClickBtn = document.getElementById("upgrade-click");
const autoClickerBtn = document.getElementById("auto-clicker");

let balance = 0;
let clickValue = 1;
let autoClicker = 0;

// Получение данных пользователя
const userId = "test_user"; // Замени на Telegram ID пользователя

async function loadUserData() {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    balance = userDoc.data().balance;
    clickValue = userDoc.data().clickValue;
    autoClicker = userDoc.data().autoClicker;
    updateUI();
  } else {
    await setDoc(doc(db, "users", userId), { balance, clickValue, autoClicker });
  }
}

// Обновление UI
function updateUI() {
  balanceDisplay.innerText = balance;
}

// Клик по криперу
creeper.addEventListener("click", async () => {
  balance += clickValue;
  updateUI();
  await updateDoc(doc(db, "users", userId), { balance });
  showAnimation(clickValue);
});

// Покупка улучшения клика
upgradeClickBtn.addEventListener("click", async () => {
  if (balance >= 10) {
    balance -= 10;
    clickValue += 1;
    updateUI();
    await updateDoc(doc(db, "users", userId), { balance, clickValue });
  }
});

// Покупка автокликера
autoClickerBtn.addEventListener("click", async () => {
  if (balance >= 50) {
    balance -= 50;
    autoClicker += 1;
    updateUI();
    await updateDoc(doc(db, "users", userId), { balance, autoClicker });
  }
});

// Автокликер
setInterval(async () => {
  if (autoClicker > 0) {
    balance += autoClicker;
    updateUI();
    await updateDoc(doc(db, "users", userId), { balance });
  }
}, 1000);

// Анимация клика
function showAnimation(value) {
  const anim = document.createElement("div");
  anim.classList.add("creeper-popup");
  anim.innerText = `+${value}`;
  document.body.appendChild(anim);
  setTimeout(() => anim.remove(), 1000);
}

// Загрузка данных
loadUserData();
