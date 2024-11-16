import { registerUser } from '../api/auth.js';

document.querySelector('#registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;

    const userData = { name, email, password };

    try {
        console.log('Submit-knappen trykket. Prøver å registrere bruker...');
        await registerUser(userData);
        console.log('Registrering fullført. Brukeren er logget inn og omdirigert til feed-siden.');
    } catch (error) {
        document.querySelector('#error').textContent = 'Registration failed. Please check your inputs.';
        console.error('Registrering feilet:', error);
    }
});
