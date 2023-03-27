
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

function SignUp(){
  const classes = useStyles();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async(event) => {
    event.preventDefault();
   
    const newUser = {

        id : Date.now(),
        fullName,
        username,
        email,
        password,
        avatar,

    }

    await fetch('http://localhost:1000/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });

        
        setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setAvatar('');

  };

  return (
    <form className={`${classes.root} container mt-4`} onSubmit={handleSubmit} id='form'>
      <TextField
        id="full-name"
        label="Full Name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        className=' w-50'
      /> <br />

      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className='w-50 mt-3'
      /> <br />
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className='mt-3 w-50'
      /> <br />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className='mt-3 w-50'
      /><br />
      <TextField
        id="avatar"
        label="Avatar"
        value={avatar}
        onChange={(event) => setAvatar(event.target.value)}
        className='mt-3 w-50'
      /><br />
      <Button variant="contained" color="primary" type="submit" className='mt-3'>
        Sign Up
      </Button>
    </form>
  )
  }
  export default SignUp;
