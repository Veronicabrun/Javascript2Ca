 // Håndterer brukerinteraksjon for login-siden
 import { loginUser } from '../api/auth.js';

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Submit-knappen trykket. Prøver å logge inn...'); // Bekrefter at submit fungerer


    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    try {
        console.log('Prøver å logge inn med:', email);
        await loginUser(email, password);
        console.log('Brukeren er logget inn!'); // Konsollmelding etter suksess
    } catch (error) {
        console.error('Innlogging feilet:', error); // Feilmelding i konsollen
        document.querySelector('#error').textContent = 'Login failed. Please check your credentials.';
    }
});
