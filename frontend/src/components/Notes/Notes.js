import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import AddNote from './AddNote';
import Editnote from './EditNote';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import DeleteNote from './DeleteNote';

const data = [
  {
    id: 1,
    primary: 'Morning Jog',
    secondary: "Planning to start the day with a morning jog at the park. It's a great way to clear my mind.",
    mood: 'good',
  },
  {
    id: 2,
    primary: 'Project Deadline',
    secondary: "The project deadline is approaching fast. Feeling a bit stressed about getting everything done on time.",
    mood: 'bad',
  },
  {
    id: 3,
    primary: 'Weekend Plans',
    secondary: "Looking forward to the weekend getaway. Hoping the weather stays nice!",
    mood: 'good',
  },
  {
    id: 4,
    primary: 'Gym Session',
    secondary: "Missed my gym session today because I had to work late. Planning to make up for it tomorrow.",
    mood: 'ok',
  },
  {
    id: 5,
    primary: "Car Repair",
    secondary: "The car is finally getting repaired this Thursday. It’s been overdue for a maintenance check.",
    mood: 'bad',
  },
  {
    id: 6,
    primary: 'Book Club Meeting',
    secondary: "Our book club is meeting this Sunday to discuss the latest read. Can't wait to hear everyone's thoughts.",
    mood: 'ok',
  },
  {
    id: 7,
    primary: 'Garden Update',
    secondary: "Spent the afternoon gardening. The new flowers are starting to bloom beautifully.",
    mood: 'good',
  },
];

export default function Notes() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notes, setNotes] = useState(data);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const deleteNote = (noteID) => {
    console.log('in Notes')
    setNotes(notes.filter(note => note.id !== noteID));
    handleClose();
};

  const editNote = (id) => () => {
    console.log(id);
    handleClose();
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

   // Function to add a new note
   const addNote = () => {
    const newNote = {
      id: notes.length + 1,
      primary: 'New Note',
      secondary: 'Description of the new note',
      mood: 'good'
    };
    setNotes([...notes, newNote]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px', maxWidth: '85%', margin: 'auto' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Notes
          <hr style={{ borderColor: 'black', width: '100%', margin: '20px auto' }}/>
        </Typography>
        <List sx={{ mb: 2 }}>
          {notes.map(({ id, primary, secondary, mood }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Today
                </ListSubheader>
              )}

              {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Yesterday
                </ListSubheader>
              )}

              <ListItemButton>
                <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'transparent' }}>
                  {mood === 'bad' ? <SentimentVeryDissatisfiedIcon style={{ color: 'red', fontSize: '40px' }}/>
                  : mood === 'ok' ? <SentimentDissatisfiedIcon style={{ color: 'gray', fontSize: '40px' }}/> 
                  : <SentimentSatisfiedIcon style={{ color: 'green', fontSize: '40px' }}/>}
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
                <IconButton color="inherit" onClick={(event) => handleClick(event, id)}>
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={editNote(selectedItemId)}>
                    <Editnote  noteID={selectedItemId}/>
                  </MenuItem>
                  <MenuItem  sx={{ color: 'red' }}>
                  <DeleteNote noteID={selectedItemId} onDelete={deleteNote}/>
                  </MenuItem>
                </Menu>
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
            <AddNote/>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
