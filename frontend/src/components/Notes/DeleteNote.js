import * as React from 'react';
import Button from '@mui/material/Button';


export default function DeleteNote({noteID, onDelete}) {

  const handleClick = () => {
    console.log('In deleteNote')
    onDelete(noteID);

  }
  return (
    <React.Fragment>
      <Button onClick={handleClick} style={{textDecoration: 'none', color: 'red'}}>
        DELETE
      </Button>
    </React.Fragment>
  );
}
