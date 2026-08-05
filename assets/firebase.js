// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-sXElOvlT2flS8GVLWBWYQ8JdpTUJAWs",
  authDomain: "chive-club-website.firebaseapp.com",
  projectId: "chive-club-website",
  storageBucket: "chive-club-website.firebasestorage.app",
  messagingSenderId: "33996148800",
  appId: "1:33996148800:web:30e51818a0023ed61acfa5",
  measurementId: "G-WD88DLKEVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addSignupData(data) {
    try {
        const parsedData = JSON.parse(data);
        const docRef = await addDoc(collection(db, "signupForest"), {
            name: parsedData.name,
            email: parsedData.email,
            count: 0
        });
        console.log("Saved successfully! ID:", docRef.id);
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

export { addSignupData, db };
