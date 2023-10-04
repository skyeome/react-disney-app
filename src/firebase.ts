// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7JX9-gd9OUmtH6KnNbWgnfr2PWYUQJrI",
  authDomain: "skyome-disney-clone-app.firebaseapp.com",
  projectId: "skyome-disney-clone-app",
  storageBucket: "skyome-disney-clone-app.appspot.com",
  messagingSenderId: "267984254960",
  appId: "1:267984254960:web:eae3ffe279b860ab3fcf35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
