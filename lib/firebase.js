// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIjVsVk4_6e9TZ_MiTuWaRNDxkb6Dc1bY",
  authDomain: "wildfire-detection-netwo-74f3b.firebaseapp.com",
  databaseURL: "https://wildfire-detection-netwo-74f3b-default-rtdb.firebaseio.com",
  projectId: "wildfire-detection-netwo-74f3b",
  storageBucket: "wildfire-detection-netwo-74f3b.firebasestorage.app",
  messagingSenderId: "458488890888",
  appId: "1:458488890888:web:e6088e57eed0b57a04f3bd",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
