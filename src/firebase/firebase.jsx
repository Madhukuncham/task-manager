import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // ✅ Needed for auth
import { getFirestore } from "firebase/firestore"; // ✅ Needed for Firestore


const firebaseConfig = {
  apiKey: "AIzaSyB5kqEwae46OXpTK-qqygcyIVa7LOl4NPg",
  authDomain: "task-manager-4512f.firebaseapp.com",
  projectId: "task-manager-4512f",
  storageBucket: "task-manager-4512f.firebasestorage.app",
  messagingSenderId: "283067910946",
  appId: "1:283067910946:web:0640659ad5cab9fb00337b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
