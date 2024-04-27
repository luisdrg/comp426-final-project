import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {useState} from "react";

function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.error(err);
        }
    }

    const logOut = async () => {
        try{
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
        <button onClick={signIn}> Sign In</button>
        <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Auth;
