// Handles API calls for login and registration
 import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../config/constants.js';
 import { storeInLocalStorage } from '../utilities/localStorage.js';
 import { API_KEY } from '../config/constants.js';
/**
 * Logs in the user.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} 
 * @example
 * // Usage example:
 * loginUser('test123@stud.noroff.no', 'testPassword123')
 *     .then(() => console.log('User logged in successfully'))
 *     .catch(error => console.error('Login error:', error));
 */
 export async function loginUser(email, password) {
  try {
      console.log('Starting login for:', email);

      const response = await fetch(LOGIN_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Noroff-API-Key': API_KEY, 
          },
          body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      console.log('Received response data:', responseData);

      if (!response.ok) {
          throw new Error(`Login failed with status ${response.status}`);
      }

      // Retrieve token from the response (now from responseData.data.accessToken)
      const token = responseData.data?.accessToken; 
      const username = responseData.data?.name; 
      if (!token) {
          throw new Error('Did not receive token from the API');
      }

      console.log('Login successful! Received token:', token);

      // Save token, username, and email in localStorage
      storeInLocalStorage('accessToken', token);
      storeInLocalStorage('userEmail', email);
      storeInLocalStorage('username', username); 

      console.log('Token, username, and email saved in localStorage.');

      // Redirect to the feed page
      window.location.href = '/pages/feed/feed.html';
  } catch (error) {
      console.error('Error logging in:', error);
      throw error;
  }
}

/**
 * Registering a new user.
 * @param {Object} userData - Object with user data for registration.
 * @param {string} userData.name - The user's username.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<void>} 
 * @example
 * // Usage example:
 * registerUser({
 *     name: 'john_doe',
 *     email: 'john.doe@stud.noroff.no',  // Valid email with @stud.noroff.no
 *     password: 'securePassword123'
 * })
 *     .then(() => console.log('User registered successfully'))
 *     .catch(error => console.error('Registration error:', error));
 */

export async function registerUser(userData) {
  try {
      console.log('Starting registration for:', userData.email);

      const response = await fetch(REGISTER_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Noroff-API-Key': API_KEY, 
          },
          body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log('Received response data:', responseData);

      if (!response.ok) {
          throw new Error(`Registration failed with status ${response.status}`);
      }

      console.log('Registration successful! User created:', responseData);

      // Redirect to the login page after registration
      //window.location.href = '/pages/login/login.html';
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
}
 