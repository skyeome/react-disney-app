// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-40uo4U6gVzVJNy2OIwi2zmhj1VDO-jY",
  authDomain: "skyome-disney-plus.firebaseapp.com",
  projectId: "skyome-disney-plus",
  storageBucket: "skyome-disney-plus.appspot.com",
  messagingSenderId: "231588506316",
  appId: "1:231588506316:web:0b8775c08e506637a2f069"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
