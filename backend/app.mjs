import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

dotenv.config();
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

const appFB = initializeApp(firebaseConfig);
const auth = getAuth(appFB);
const db =  getFirestore(appFB);

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 4000;

app.get('/test', (req, res) => {
    res.status(200).send("API is working");
});

app.get('/users', async (req, res) => {
    try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDocs(userRef);
 
        if (docSnap.exists()) {
            res.status(200).send({ id: docSnap.id, ...docSnap.data() });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    }
});

app.post('/users', (req, res) => {
    try {
        const userData = req.body;
        const docRef = await addDoc(collection(db, "users"), userData);
        console.log("User created with ID: ", docRef.id);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    }
});

app.put('/users/:id', (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, userData);
        res.status(200).send({ id: userId, ...userData });
    } catch (error) {
        console.log(error);
        if (error.code === 'not-found') {
            res.status(404).send('User not found');
        } else {
            res.status(500).send(error.toString());
        }
    }
});

app.delete('/users/:id', (req, res) => {
    try {
        await deleteDoc(doc(db, "users", req.params.id));
        console.log("User deleted with ID: ", req.params.id);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    } 
})


////NOTES////
app.get('/notes', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.get('/notes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.post('/notes', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.put('/notes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.delete('/notes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})



////3rd Party API////







app.listen(port, () => {
    console.log('Running...');
})