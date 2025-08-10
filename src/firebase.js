import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQZEySDLSH3q2rLjXJu4P4fZJh9cmYsUE",
  authDomain: "employeemanagementsystem-180a6.firebaseapp.com",
  projectId: "employeemanagementsystem-180a6",
  storageBucket: "employeemanagementsystem-180a6.firebasestorage.app",
  messagingSenderId: "974476224781",
  appId: "1:974476224781:web:cdf33f11187237cb702844",
  measurementId: "G-D618C17TK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);