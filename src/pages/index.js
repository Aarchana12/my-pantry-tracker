import React from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Mail } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleCreatePantryList = () => {
    router.push('/pantry-form'); // Navigate to the PantryForm page
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" p={3}>
      <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
        <Typography variant="h4" gutterBottom>Welcome to My Pantry Tracker</Typography>
        <Typography variant="body1" gutterBottom>
          Manage and keep track of all your pantry items. Add new items, update existing ones, and never run out of essentials.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCreatePantryList} sx={{ mt: 2 }}>
          Create Pantry List
        </Button>

        {/* Image */}
        <Box mt={4} display="flex" justifyContent="center">
          <img 
            src="/grocery-store.jpg" 
            alt="Grocery Store" 
            style={{ width: '50%', maxWidth: '600px', height: 'auto' }}
          />
        </Box>
      </Box>

      <footer style={{ marginTop: 'auto', padding: '20px', backgroundColor: '#1976d2', color: '#fff' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" gutterBottom>Contact Us</Typography>
          <Typography variant="body2">Email: mypantrytracker@gmail.com</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} My Pantry Tracker. All rights reserved.
          </Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default Home;
