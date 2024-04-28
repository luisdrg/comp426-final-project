import { auth } from "./config/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'

export const signUp = async (email, password) => {
    try{
        await createUserWithEmailAndPassword(auth, email, password);
    }catch(err){
        if (err.code === 'auth/email-already-in-use'){
            alert('Email already in use. Please log in or recover your password.');
        }
        console.error(err);
    }
}

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in succesfully')
        const user = auth.currentUser;
        if (user) {
            console.log("Logged in as:", user.email);            
        }
    } catch (err) {
        if (err.code === 'auth/invalid-email' || err.code ==='auth/invalid-credential'){
            console.log('Invalid login or unregistered account.');
        }
        console.error(err);
    }
}

export const logOut = async () => {
    try{
        await signOut(auth);
    }catch(err){
        console.error(err);
    }
}