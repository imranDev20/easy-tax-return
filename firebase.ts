// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsUMCpFed61GG35MtNquy2RfD5ngQQkW0",
  authDomain: "e-taxreturns.firebaseapp.com",
  projectId: "e-taxreturns",
  storageBucket: "e-taxreturns.appspot.com",
  messagingSenderId: "244577276750",
  appId: "1:244577276750:web:6c00b916ac5f0f7f30441f",
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get Firebase Auth instance
const auth = getAuth(app);
auth.useDeviceLanguage(); // Set to device language

export default auth;
