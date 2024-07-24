// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-all-projects-5180.firebaseapp.com",
  projectId: "my-all-projects-5180",
  storageBucket: "my-all-projects-5180.appspot.com",
  messagingSenderId: "212571721722",
  appId: "1:212571721722:web:6615e32365c36681fa1e43",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
