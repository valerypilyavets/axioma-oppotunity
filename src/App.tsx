import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import './App.css';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Plate scanner app
          </Typography>
          <>
            <Button color='inherit'><NavLink to={'/scan-plate'}>Scan plate</NavLink></Button>
            <Button color='inherit'><NavLink to={'/create-account'}>Create account</NavLink></Button>
            <Button color='inherit'><NavLink to={'/top-up'}>Top up</NavLink></Button>
            <Button color='inherit'><NavLink to={'/report'}>Report</NavLink></Button>
          </>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='sm'>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}

export default App;