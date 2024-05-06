import { db } from './app.mjs';
import { doc, collection, addDoc,getDocs, updateDoc,deleteDoc} from 'firebase/firestore';


// Create new note for a specific user
export const addNewNote = async (userId, { title, note }) => {
    try {
        console.log('Adding new note:'); 
        console.log('userId:', userId); 
        console.log('title:', title); 
        console.log('note:', note);

        const userRef = doc(db, 'users', userId);
        const notesCollectionRef = collection(userRef, 'Notes');
        const newNoteRef = await addDoc(notesCollectionRef, { title, note });
        
        console.log('New note added with ID:', newNoteRef.id);
        return newNoteRef.id; 
    } catch (error) {
        console.error('Error adding note:', error);
        throw error; 
    }
};

// Get all notes for a specific user
export const getAllNotes = async (userId) => {
    try {
        const notes = [];
        const userRef = doc(db, 'users', userId);
        const notesSnapshot = await getDocs(collection(userRef, 'Notes'));
        notesSnapshot.forEach((doc) => {
        // Extract note data from the document
        const data = doc.data();
        // Check if data exists (document is not empty) 
        if (data) {
        // Push note data to the notes array
        notes.push({ id: doc.id, title: data.title, note: data.note }); 
        }
        });
        console.log('Notes fetched successfully:', notes);
        return notes; 
    } catch (error) {
        console.error('Error getting notes:', error);
        throw error; 
    }
};

export const updateNote = async ({ userId, noteId, title, note }) => {
    try {
    // Get a reference to the user's document
    const userRef = doc(db, 'users', userId);
    // Get a reference to the note's document inside the user's document 
    const noteRef = doc(userRef, 'Notes', noteId);
    // Update the note's document with the new title and note content 
    await updateDoc(noteRef, {
        title,
        note 
    });
    console.log('Note updated successfully'); 
    } catch (error) {
        console.error('Error updating note:', error);
        throw error; 
    }
};

// Delete note for a specific user
export const deleteNote = async ({ userId, noteId }) => {
    try {
    // Get a reference to the user's document
    const userRef = doc(db, 'users', userId);
    // Get a reference to the note's document inside the user's document 
    const noteRef = doc(collection(userRef, 'notes'), noteId);
    // Delete the note's document
    await deleteDoc(noteRef);
    console.log('Note deleted successfully');
    } catch (error) {
    console.error('Error deleting note:', error); throw error;
    } 
};