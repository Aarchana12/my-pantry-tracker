import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography, Box } from '@mui/material';
import Link from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/signIn');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Link href="/signin">Already have an account? Sign in</Link>
    </Box>
  );
};

export default SignUp;
