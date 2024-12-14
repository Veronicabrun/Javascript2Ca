 // Handling user interaction for the login page
 import { loginUser } from '../api/auth.js';

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Submit button clicked. Trying to log in...'); 


    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    try {
        console.log('Trying to log in with:', email);
        await loginUser(email, password);
        console.log('The user is logged in!'); 
    } catch (error) {
        console.error('Login failed:', error); 
        document.querySelector('#error').textContent = 'Login failed. Please check your credentials.';
    }
});
