
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {setCredentials} from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/apiSlice';

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

  const navigate = useNavigate();
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  


  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const userData = await login({username, password}).unwrap();
      dispatch(setCredentials({...userData, username}))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      console.log(error);
    }

   
    setUsername('');
    setPassword('');
  };


  if(isLoading) return <h1>Loading---</h1>

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
