import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './env';

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

export { app, db };
