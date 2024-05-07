import * as React from 'react';
import Button from '@mui/material/Button';
import { auth, db } from '../../config/firebase'
import axios from 'axios';

export default function DeleteNote({noteID, onDeleteNote}) {

  const handleClick = async() => {
    console.log('In deleteNote', noteID)
    const user = auth.currentUser;
    try {
      const response = await axios.delete(`http://localhost:4000/api/users/${user.uid}/notes/${noteID}`);
      console.log(response.data);
      onDeleteNote(noteID);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <React.Fragment>
      <Button onClick={handleClick} style={{textDecoration: 'none', color: 'red'}}>
        DELETE
      </Button>
    </React.Fragment>
  );
}
