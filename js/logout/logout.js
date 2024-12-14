//Logout
import { clearLocalStorage } from '../utilities/localStorage.js';

/**
 * Logging out the user by deleting localStorage data and redirecting
 */
function logoutUser() {
    console.log('Logging out the user...');
    clearLocalStorage();
    window.location.href = '/index.html'; 
}

// Adding an event listener for the logout button
document.querySelector('#logout-button').addEventListener('click', logoutUser);
