import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
 
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
app.use(express.json());
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
 
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);
 
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
 
app.post('/users', async (req, res) => {
    try {
        const userData = req.body;
        const newUserRef = doc(collection(db, "users"));
        await setDoc(newUserRef, userData);
        res.status(200).send({ id: newUserRef, ...userData });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    }
})
 
app.put('/users/:id', async (req, res) => {
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
 
 
app.delete('/users/:id', async (req, res) => {
    try {
        await deleteDoc(doc(db, "users", req.params.id));
        console.log("User deleted with ID: ", req.params.id);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    } 
})


// Create a new note 
app.post('/api/users/:userId/notes', async (req, res) => {
    try {
        const { userId } = req.params; 
        const { title, note } = req.body;
        console.log('Received request to add new note:'); 
        console.log('userId:', userId);
        console.log('title:', title);
        console.log('note:', note);
        const noteId = await addNewNote(userId, { title, note });
        res.status(201).json({ message: `New note created with ID: ${noteId}` }); 
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Error creating note' }); 
    }
});

// Get all notes for a specific user 
app.get('/api/users/:userId/notes', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Received request to fetch notes for user:", userId); 
        const notes = await getAllNotes(userId);
        console.log("Notes fetched successfully:", notes); res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error); 
        res.status(500).json({ error: 'Error fetching notes' });
    } 
});

// Update a note for a specific user
app.put('/api/users/:userId/notes/:noteId', async (req, res) => { 
    try {
        const { userId, noteId } = req.params;
        const { title, note } = req.body;
        await updateNote({ userId, noteId, title, note }); 
        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error('Error updating note:', error); 
        res.status(500).json({ error: 'Error updating note' });
    } 
});

// Delete a note for a specific user 
app.delete('/api/users/:userId/notes/:noteId', async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        await deleteNote({ userId, noteId });
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error); 
        res.status(500).json({ error: 'Error deleting note' });
    } 
});


 
 
app.listen(port, () => {
    console.log('Running...');
})