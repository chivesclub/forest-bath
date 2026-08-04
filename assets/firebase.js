// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, getDocs, serverTimestamp, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
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
        const docRef = await addDoc(collection(db, "signupForest"), {
            name: data.get("name"),
            email: data.get("email"),
            count: 0
        });
        console.log("Saved successfully! ID:", docRef.id);
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

async function getAllSignupData() {
  // 2. Reference the targeted collection
  const colRef = collection(db, "signupForest");

  // 3. Fetch the collection snapshot
  const querySnapshot = await getDocs(colRef);

  // 4. Map or loop through the documents
  const allDocs = querySnapshot.docs.map(doc => ({
    id: doc.id,         // The document ID string
    ...doc.data()       // The document fields object
  }));

  return allDocs;
}

// Update count
async function updateCount(userData, countPara) {
  const docRef = doc(db, "signup", userData.id)
  await updateDoc(docRef, {
      count: countPara+1
    });
}

export { addSignupData, getAllSignupData, updateCount, db };
