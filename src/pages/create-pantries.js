import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import PantryForm from '../components/PantryForm'; // Adjust path if needed
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CreatePantries = () => {
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pantryItems'));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPantryItems(items);
      } catch (error) {
        console.error('Error fetching pantry items: ', error);
      }
    };

    fetchPantryItems();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Pantry List
      </Typography>
      <Box mt={2}>
        <PantryForm />
      </Box>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Pantry Items
        </Typography>
        <Card>
          <CardContent>
            <List>
              {pantryItems.length > 0 ? (
                pantryItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={item.item} secondary={`Quantity: ${item.quantity}`} />
                  </ListItem>
                ))
              ) : (
                <Typography>No items found</Typography>
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CreatePantries;
