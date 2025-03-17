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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
