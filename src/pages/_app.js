import '../styles/global.css'; // Styles are in src/styles
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme'; // Ensure theme is in src/theme
import NavBar from '../components/NavBar'; // Ensure NavBar is in src/components

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
