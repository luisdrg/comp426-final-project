import React from 'react';
import { Container, Grid } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Container>
    <Grid container spacing={0} style={{ height: '85vh' }}>
      <Grid item xs={6} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <SentimentVeryDissatisfiedIcon style={{ color: 'red', fontSize: '100px' }}/>
      </Grid>
      <Grid item xs={6} style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SentimentDissatisfiedIcon style={{ color: 'gray', fontSize: '100px' }} />
      </Grid>
      <Grid item xs={6} style={{ borderTop: '1px solid black', borderRight: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SentimentSatisfiedIcon style={{ color: 'green', fontSize: '100px' }}/>
      </Grid>
      <Grid item xs={6} style={{ borderTop: '1px solid black', borderLeft: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={() => { navigate('/') }}>
        <SearchIcon style={{ fontSize: '100px' }}/>
      </Button>
      </Grid>
    </Grid>
    </Container>
  );
}

export default Dashboard;
