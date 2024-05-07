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
import { useState, useEffect } from 'react';
import AddNote from './AddNote';
import Editnote from './EditNote';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import DeleteNote from './DeleteNote';
import useNotes from './useNotes'

export default function Notes({data}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notes, addNote, deleteNote, updateNote } = useNotes(data);
  const [selectedItemId, setSelectedItemId] = useState("");
    
//    const addNewNote = (formJson) => {
//     const newNote = {
//       id: notes.length + 2,
//       title: formJson.title,
//       note: formJson.note,
//       mood: formJson.mood
//     };
//     setData([...data, newNote]);
//   };
//   const deleteCurrentNote = (noteID) => {
//     console.log('in Notes')
//     setData(data.filter(note => note.id !== noteID));
//     handleClose();
// };

//   const editNote = (id) => () => {
//     console.log(id);
//     handleClose();
//   };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
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
          {notes.map(({ id, title, note, mood }) => (
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
                <ListItemText primary={title} secondary={note} />
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
                  <MenuItem>
                    <Editnote  noteID={selectedItemId}/>
                  </MenuItem>
                  <MenuItem  sx={{ color: 'red' }}>
                  <DeleteNote/>
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
            <AddNote onAdd={addNote}/>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
