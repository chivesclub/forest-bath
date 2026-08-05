// Import the functions you need from the SDKs you need
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, collection, doc, getDocs, updateDoc } from "firebase-admin/firestore";

// Load the secret key from the GitHub Actions environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

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

export { getAllSignupData, updateCount, db };
