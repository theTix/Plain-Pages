import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuVZbj7LHNMWodQzzDdBE4VHKnsywxg8g",
    authDomain: "plain-pages.firebaseapp.com",
    projectId: "plain-pages",
    storageBucket: "plain-pages.appspot.com",
    messagingSenderId: "254123797912",
    appId: "1:254123797912:web:f1d5660f062ee628240fed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

export default getFirestore();

export const ImageDB = getStorage(app);

export const firestore = getFirestore(app);
export const db = firestore;