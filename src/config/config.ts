import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM9Q6tF_tyYaUAN1AGgugNjvKSee3UTfs",
  authDomain: "green-shop-tuychiboyev.firebaseapp.com",
  projectId: "green-shop-tuychiboyev",
  storageBucket: "green-shop-tuychiboyev.firebasestorage.app",
  messagingSenderId: "629167017049",
  appId: "1:629167017049:web:8c4c2af4843b53e864f548",
  measurementId: "G-CEVQTRPFSN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
