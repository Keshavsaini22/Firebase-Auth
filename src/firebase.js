import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAnLiBfnc0cjYakx0t1nw_eI3H8TYrxJ3g",
    authDomain: "react-firebase-my-auth.firebaseapp.com",
    projectId: "react-firebase-my-auth",
    storageBucket: "react-firebase-my-auth.appspot.com",
    messagingSenderId: "180134166577",
    appId: "1:180134166577:web:02c65269c36cd20d1d1510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export default app;