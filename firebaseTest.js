import { app } from './firebaseConfig.js';

function testFirebaseConnection() {
  try {
    // Vérification de l'initialisation de Firebase
    if (app && app.options) {
      console.log('✅ Firebase est correctement initialisé !');
      console.log('Détails de la connexion :');
      console.log('- Nom de l\'application :', app.name);
      console.log('- Project ID:', app.options.projectId);
      console.log('- Auth Domain:', app.options.authDomain);
    } else {
      console.error('❌ Erreur : Firebase n\'est pas correctement initialisé');
    }
  } catch (error) {
    console.error('❌ Erreur lors du test de connexion :', error.message);
  }
}

// Exécuter le test
testFirebaseConnection();
