import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDICY9F019kWbJWo3VExX2GGLakIRSEYEY",
  authDomain: "gorent-wheels.firebaseapp.com",
  projectId: "gorent-wheels",
  storageBucket: "gorent-wheels.firebasestorage.app",
  messagingSenderId: "847493427253",
  appId: "1:847493427253:web:99714de6d051339816c17c"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
