import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Replace these with your Firebase project's config values
const firebaseConfig = {
  apiKey: 'AIzaSyC_r9P7E_b0GX5p_jyvUbnvFLYZ4wclSoA',
  authDomain: 'pantry-tracker-462ea.firebaseapp.com',
  projectId: 'pantry-tracker-462ea',
  storageBucket: 'pantry-tracker-462ea.appspot.com',
  messagingSenderId: '372332955106',
  appId: '1:372332955106:web:fa291a4dceabfada1465bb',
};

// Check if an app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
