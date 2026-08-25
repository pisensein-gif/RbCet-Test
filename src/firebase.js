import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyEA9PQgvimZTAKkEzZWFAMEmynvkV4DE",
  authDomain: "robocet-18476.firebaseapp.com",
  projectId: "robocet-18476",
  storageBucket: "robocet-18476.firebasestorage.app",
  messagingSenderId: "807573118240",
  appId: "1:807573118240:web:4aa490538018a295538b45"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
