import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyCjEniCajEaY8rFUnRpwmMeQN6XldbOMs8",
  authDomain: "test-app-b7e33.firebaseapp.com",
  projectId: "test-app-b7e33",
  storageBucket: "test-app-b7e33.appspot.com",
  messagingSenderId: "814844948813",
  appId: "1:814844948813:web:4f8e76a039f74c7ca6c704",
  measurementId: "G-TY11MGYM4X",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
