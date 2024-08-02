import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, provider } from '../lib/firebase'; // Ensure provider is exported from your firebase setup
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { TextField, Button, Typography, Box } from '@mui/material';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Sign In
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
        Sign In
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleGoogleSignIn}
        sx={{ mt: 2, mb: 2 }}
      >
        Sign In with Google
      </Button>
      <Link href="/signup">Don't have an account? Sign Up</Link>
    </Box>
  );
};

export default SignIn;
