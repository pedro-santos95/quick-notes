import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import App from "next/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTnebuKcVh83_CIUVd27cpH3ECebYK5no",
  authDomain: "quick-notes-8b6b0.firebaseapp.com",
  projectId: "quick-notes-8b6b0",
  storageBucket: "quick-notes-8b6b0.firebasestorage.app",
  messagingSenderId: "352975005427",
  appId: "1:352975005427:web:c9bd03bea0df7ea284f986"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };