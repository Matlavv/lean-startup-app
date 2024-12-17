import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './env';

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

try {
  console.log('Firebase initialisé avec succès !');
  console.log('Project ID:', app.options.projectId);
  console.log('Firebase App name:', app.name);
} catch (error) {
  console.error("Erreur lors de l'initialisation de Firebase:", error);
}

export { app, db };
