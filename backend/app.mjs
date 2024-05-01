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
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.post('/users', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.put('/users/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.delete('/users/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
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