import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Addnote() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson); // Output the form data to console
            handleClose();
          },
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
            name="Title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
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
          <FormLabel id="demo-radio-buttons-group-label" sx={{ mb: 2 }}>
            What is your mood?
          </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="ok"
              name="mood"
            >
              <FormControlLabel 
                value="bad" 
                control={<Radio/>} 
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
    </React.Fragment>
  );
}