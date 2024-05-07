import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBt8KDfOUoTwlng9EB4cxuqjHZBFrm68IY",
  authDomain: "final-project-15beb.firebaseapp.com",
  databaseURL: "https://final-project-15beb-default-rtdb.firebaseio.com",
  projectId: "final-project-15beb",
  storageBucket: "final-project-15beb.appspot.com",
  messagingSenderId: "447162441122",
  appId: "1:447162441122:web:be3751767f9727da50e6fb",
  measurementId: "G-BTJTKQE0ZF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db =  getFirestore(app);