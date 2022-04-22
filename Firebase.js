import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiRzvKRdLmjULb4fEEt8KKBWRFbykThRE",
  authDomain: "chat-28a78.firebaseapp.com",
  projectId: "chat-28a78",
  storageBucket: "chat-28a78.appspot.com",
  messagingSenderId: "216748540468",
  appId: "1:216748540468:web:b4578d73139cb51b724061",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const googleProv = new GoogleAuthProvider();

export { auth, db, googleProv };
