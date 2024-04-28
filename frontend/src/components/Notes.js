import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

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

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Notes() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notes, setNotes] = useState(data);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const deleteNote = (id) => () => {
    setNotes(notes.filter((note) => note.id !== id));
    handleClose();  // Ensure to close the menu after deleting
  };

  const viewNote = (id) => () => {
    console.log(id);
    handleClose();  // Ensure to close the menu after viewing
  };

  const editNote = (id) => () => {
    console.log(id);
    handleClose();  // Ensure to close the menu after viewing
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
      id: notes.length + 1, // Assign a new ID
      primary: 'New Note',
      secondary: 'Description of the new note',
      mood: 'good' // You can set a default or make this dynamic
    };
    setNotes([...notes, newNote]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
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
                  <Avatar alt="Profile Picture" src={`/${mood}.jpg`} />
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
                  <MenuItem onClick={viewNote(selectedItemId)}>View</MenuItem>
                  <MenuItem onClick={editNote(selectedItemId)}>Edit</MenuItem>
                  <MenuItem onClick={deleteNote(selectedItemId)} sx={{ color: 'red' }}>Delete</MenuItem>
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
          <StyledFab color="secondary" aria-label="add" onClick={addNote}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
