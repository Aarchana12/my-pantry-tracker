import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for primary elements
    },
    secondary: {
      main: '#dc004e', // Pink color for secondary elements
    },
    error: {
      main: '#d32f2f', // Red color for errors
    },
    background: {
      default: '#f4f4f4', // Light grey background
    },
  },
  typography: {
    h3: {
      color: '#333', // Darker color for headers
    },
    body1: {
      color: '#555', // Darker color for body text
    },
  },
});

export default theme;
