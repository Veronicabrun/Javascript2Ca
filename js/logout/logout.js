//Logout
import { clearLocalStorage } from '../utilities/localStorage.js';

/**
 * Logger ut brukeren ved å slette `localStorage`-data og omdirigere.
 */
function logoutUser() {
    console.log('Logger ut bruker...');
    clearLocalStorage();
    window.location.href = '/index.html'; // Omdirigerer til innloggingssiden
}

// Legger til en eventlistener for logg ut-knappen
document.querySelector('#logout-button').addEventListener('click', logoutUser);
