//registration
import { registerUser } from '../api/auth.js';

document.querySelector('#registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;

    const userData = { name, email, password };

    try {
        console.log('Submit button clicked. Trying to register user...');
        await registerUser(userData);
        console.log('Registration complete. The user is logged in and redirected to the feed page.');
    } catch (error) {
        document.querySelector('#error').textContent = 'Registration failed. Please check your inputs.';
        console.error('Registration failed:', error);
    }
});
