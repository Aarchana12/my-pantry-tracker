import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const usePantryItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pantryItems'));
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (item, quantity) => {
    try {
      const docRef = await addDoc(collection(db, 'pantryItems'), { item, quantity: Number(quantity) });
      setItems(prevItems => [...prevItems, { id: docRef.id, item, quantity: Number(quantity) }]);
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };

  const updateItem = async (id, newQuantity) => {
    try {
      const itemRef = doc(db, 'pantryItems', id);
      await updateDoc(itemRef, { quantity: Number(newQuantity) });
      setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity: Number(newQuantity) } : item)));
    } catch (error) {
      console.error('Error updating item: ', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const itemRef = doc(db, 'pantryItems', id);
      await deleteDoc(itemRef);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default usePantryItems;
