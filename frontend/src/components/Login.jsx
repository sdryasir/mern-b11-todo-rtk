
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

function Login(){
  const classes = useStyles();

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async(event) => {
    event.preventDefault();

    const loginDetails = {
        username,
        password,

    }

    await fetch('http://localhost:1000/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails)
        });
   
    setUsername('');
    setPassword('');
  };

  return (
    <form className={`${classes.root} container mt-4`} onSubmit={handleSubmit} id='form'>
      
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className='w-50 mt-3'
      /> <br />
    
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className='mt-3 w-50'
      /><br />
      <Button variant="contained" color="primary" type="submit" className='mt-3'>
        Login
      </Button>
    </form>
  )
  }
  export default Login;
