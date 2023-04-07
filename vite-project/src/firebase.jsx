import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAVkJ6uIB8Qa3IBrjT97dJijg_GNtY5gic",
    authDomain: "authentication-course-d791d.firebaseapp.com",
    projectId: "authentication-course-d791d",
    storageBucket: "authentication-course-d791d.appspot.com",
    messagingSenderId: "396157179039",
    appId: "1:396157179039:web:5fd118d70e32b66ecb7eaa",
    measurementId: "G-461DYL4RH0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider(app)

export const Firestore = getFirestore(app)