// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPjtVWZHmrmvqY9lJ4Qj9wtvYHRClgYUY",
  authDomain: "expense-app-react.firebaseapp.com",
  projectId: "expense-app-react",
  storageBucket: "expense-app-react.appspot.com",
  messagingSenderId: "84466434539",
  appId: "1:84466434539:web:52de365396767d905259ae",
  measurementId: "G-LDGGW4ZRF4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
export const firestore = getFirestore(app);