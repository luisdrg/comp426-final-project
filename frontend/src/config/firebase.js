import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAuMYi6uEvce2sOgjBUCmAeepwQ9ZDbXnY",
  authDomain: "finalproject-11e4b.firebaseapp.com",
  projectId: "finalproject-11e4b",
  storageBucket: "finalproject-11e4b.appspot.com",
  messagingSenderId: "280674834504",
  appId: "1:280674834504:web:8bb2f76830ab9cc5fee07d",
  measurementId: "G-5HMGCVZG52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db =  getFirestore(app);