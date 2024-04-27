import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useState} from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)

    const signUp = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);

            //To-do: Create new user in firestore databse.

        }catch(err){
            if (err.code === 'auth/email-already-in-use'){
                alert('Email already in use. Please log in or recover your password.');
            }
            console.error(err);
        }
    }

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }

    const logOut = async () => {
        try{
            alert(`Logging out: ${email}`)
            await signOut(auth);
        }catch(err){
            console.error(err);
        }
    }

  return (
    <div className="Auth">
        <input placeholder = "Email..." onChange={(e)=>setEmail(e.target.value)}></input>
        <input placeholder = "Password..."
        type="password"
        onChange={(e)=>setPassword(e.target.value)}></input>
        <button onClick={signUp}>Create Account</button>
        <button onClick={signIn}> Sign In</button>
        <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Auth;
