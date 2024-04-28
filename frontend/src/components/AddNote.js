import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function AddNote() {
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
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ mb: 2, position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Creating Note
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2}}>
          <TextField 
            fullWidth
            id="standard-basic" 
            label="Title" 
            variant="standard" 
            sx={{ mb: 2 }}
            InputProps={{ 
              style: { 
                fontSize: '20px' 
              }
            }}
          />
          <TextField
            fullWidth
            id="filled-basic"
            label="Note"
            variant="filled"
            multiline
            rows={4}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
