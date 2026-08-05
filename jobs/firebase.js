// Import the functions you need from the SDKs you need
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore"; // Removed the standalone frontend methods

// Load the secret key from the GitHub Actions environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getAllSignupData() {
  // 1. Reference and fetch the collection snapshot using admin syntax (.collection().get())
  const querySnapshot = await db.collection("signupForest").get();

  // 2. Map or loop through the documents
  const allDocs = querySnapshot.docs.map(doc => ({
    id: doc.id,         // The document ID string
    ...doc.data()       // The document fields object
  }));

  return allDocs;
}

// Update count
async function updateCount(userData, countPara) {
  // 3. Reference and update the document using admin syntax (.collection().doc().update())
  await db.collection("signupForest")
    .doc(userData.id)
    .update({
      count: countPara + 1
    });
}

export { getAllSignupData, updateCount, db };
