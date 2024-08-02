import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TextField, Button, Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const MAX_REQUEST_LENGTH = 1000;

const splitText = (text) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += MAX_REQUEST_LENGTH) {
    chunks.push(text.substring(i, i + MAX_REQUEST_LENGTH));
  }
  return chunks;
};

const makeApiRequest = async (text, endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: text.map((part) => ({
          parts: [{ text: part }],
        })),
      }),
    });
    const data = await response.json();
    return data.candidates[0].content.parts.map(part => part.text).join(' ');
  } catch (error) {
    throw new Error('Error making API request');
  }
};

const PantryForm = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pantryItems, setPantryItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [recipeResults, setRecipeResults] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPantryItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        // Update item
        await updateDoc(doc(db, 'pantryItems', editItem.id), { item, quantity: Number(quantity) });
        setEditItem(null); // Clear edit state
      } else {
        // Add new item
        await addDoc(collection(db, 'pantryItems'), { item, quantity: Number(quantity) });
      }
      setItem('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding/updating item: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const handleEdit = (id, item, quantity) => {
    setEditItem({ id, item });
    setEditQuantity(quantity);
    setItem(item);
    setQuantity(quantity);
  };

  const handleSearchRecipes = async () => {
    try {
      const ingredients = pantryItems.map(item => item.item).join(', ');
      const chunks = splitText(`Find recipes for the following ingredients: ${ingredients}`);
      const results = await Promise.all(chunks.map(chunk => makeApiRequest([chunk], '/api/gemini')));
      setRecipeResults(results.join(' '));
    } catch (err) {
      setError('Error fetching recipes');
    }
  };

  const handleGetNutritionalInfo = async () => {
    try {
      const ingredients = pantryItems.map(item => item.item).join(', ');
      const chunks = splitText(`Get nutritional information for the following ingredients: ${ingredients}`);
      const results = await Promise.all(chunks.map(chunk => makeApiRequest([chunk], '/api/gemini')));
      setNutritionalInfo(results.join(' '));
    } catch (err) {
      setError('Error fetching nutritional info');
    }
  };

  return (
    <Box display="flex" gap={2} p={3}>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {editItem ? 'Update Item' : 'Add New Item'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
              {editItem ? 'Update Item' : 'Add Item'}
            </Button>
            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSearchRecipes}
                sx={{
                  color: '#000', // Text color black
                  backgroundColor: '#4caf50', // Green background
                  borderColor: '#4caf50',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#f4db7d', // Yellow background on hover
                    color: '#000' // Ensure text color remains black on hover
                  }
                }}
              >
                Search for Recipes
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleGetNutritionalInfo}
                sx={{
                  color: '#000', // Text color black
                  backgroundColor: '#4caf50', // Green background
                  borderColor: '#4caf50',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#f4db7d', // Yellow background on hover
                    color: '#000' // Ensure text color remains black on hover
                  }
                }}
              >
                Get Nutritional Info
              </Button>
            </Box>
            {recipeResults && (
              <Box mt={2}>
                <Typography variant="h6">Recipe Results:</Typography>
                <Typography>{recipeResults}</Typography>
              </Box>
            )}
            {nutritionalInfo && (
              <Box mt={2}>
                <Typography variant="h6">Nutritional Information:</Typography>
                <Typography>{nutritionalInfo}</Typography>
              </Box>
            )}
            {error && (
              <Box mt={2}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pantry List
          </Typography>
          <Box>
            {pantryItems.map((item) => (
              <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mb={2} p={2} borderBottom="1px solid #ddd">
                <Typography variant="body1">{item.item} - {item.quantity}</Typography>
                <Box>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    sx={{ color: 'red' }} // Red color for delete icon
                  >
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEdit(item.id, item.item, item.quantity)}
                    sx={{ color: 'green' }} // Green color for edit icon
                  >
                    <EditIcon sx={{ color: 'green' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PantryForm;
