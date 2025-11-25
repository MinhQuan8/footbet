import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDkQPiGhYpRwaveIPP00Q1aKEcePmAs0zQ",
    authDomain: "footbet-b857e.firebaseapp.com",
    databaseURL: "https://footbet-b857e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "footbet-b857e",
    storageBucket: "footbet-b857e.firebasestorage.app",
    messagingSenderId: "654733424567",
    appId: "1:654733424567:web:d3a4c76cd7eb6704e29a32"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
