// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE46l6nlp24QGGbrWnlUDSIQ3olulFKTo",
  authDomain: "medicsync-fb217.firebaseapp.com",
  projectId: "medicsync-fb217",
  storageBucket: "medicsync-fb217.firebasestorage.app",
  messagingSenderId: "314697195163",
  appId: "1:314697195163:web:b2a8b1f6f4f2e8d77fb03e",
  measurementId: "G-E5H016YNYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
