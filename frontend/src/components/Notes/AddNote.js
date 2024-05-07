import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { auth } from '../../config/firebase';
import axios from 'axios';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Addnote({onAdd}) {
  const [open, setOpen] = React.useState(false);
  const [showImagePopup, setShowImagePopup] = React.useState(false);
  const [dogFact, setDogFact] = React.useState('');
  const [dogPic, setDogPic] = React.useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowImagePopup(false);  // Also reset the image popup state
  };

  const fetchDogData = async () => {
    try {
      const factResponse = await axios.get('http://localhost:4000/api/facts');
      const picResponse = await axios.get('http://localhost:4000/api/pics');
      setDogFact(factResponse.data[0]); // Assuming the fact API returns an array of facts
      setDogPic(picResponse.data.message);   // Assuming the pic API returns the image URL in 'message' field
      setShowImagePopup(true);
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const userId = auth.currentUser.uid;
    try {
      const response = await axios.post(`http://localhost:4000/api/users/${userId}/notes`, formJson);
      console.log(response.data);
      onAdd(formJson);
      handleClose();
      if (formJson.mood === 'bad') {
        await fetchDogData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <StyledFab color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </StyledFab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Create a Note</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center', mt: 3 }}>
            Write now, reflect later!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="note"
            name="note"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            multiline
            sx={{ mb: 5 }}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">What is your mood?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="ok"
              name="mood"
            >
              <FormControlLabel 
                value="bad" 
                control={<Radio />} 
                label={<SentimentVeryDissatisfiedIcon style={{ color: 'red', fontSize: '40px' }} />}
              />
              <FormControlLabel 
                value="ok" 
                control={<Radio />} 
                label={<SentimentDissatisfiedIcon style={{ color: 'gray', fontSize: '40px' }} />}
              />
              <FormControlLabel 
                value="good" 
                control={<Radio />} 
                label={<SentimentSatisfiedIcon style={{ color: 'green', fontSize: '40px' }} />}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showImagePopup}
        onClose={() => setShowImagePopup(false)}
      >
        <DialogTitle>Need a Smile?</DialogTitle>
        <DialogContent>
          <img src={dogPic} alt="Cute Dog" style={{ width: '100%' }} />
          <DialogContentText sx={{ mt: 2 }}>
            Random Fact: {dogFact}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowImagePopup(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}
