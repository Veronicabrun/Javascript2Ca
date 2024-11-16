//API KEY
//05e991e0-643b-41bd-b4a7-701ca4ae441f
//const options = {
    //headers: {
      //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmVyb2JwIiwiZW1haWwiOiJ2ZXJvbmljYV9icEBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcyOTcxNjMzNH0.x__H2KXJytfJtTU-305ehsrzzNgVAHFrOr3yoCfuSdU',
      //'X-Noroff-API-Key': '05e991e0-643b-41bd-b4a7-701ca4ae441f'
    //}
  //};

 // Håndterer API-kall for login og registrering

 import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../config/constants.js';
 import { storeInLocalStorage } from '../utilities/localStorage.js';
 import { API_KEY } from '../config/constants.js';
 
 /**
  * Logger inn brukeren.
  * @param {string} email - Brukerens e-postadresse.
  * @param {string} password - Brukerens passord.
  * @returns {Promise<void>}
  */
 export async function loginUser(email, password) {
  try {
      console.log('Starter innlogging for:', email);

      const response = await fetch(LOGIN_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Noroff-API-Key': API_KEY, // Legger til API-nøkkelen her
          },
          body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      console.log('Mottatt responsdata:', responseData);

      if (!response.ok) {
          throw new Error(`Login failed with status ${response.status}`);
      }

      // Hent token fra responsen (nå fra responseData.data.accessToken)
      const token = responseData.data?.accessToken; // Navigerer inne i `data`-objektet
      if (!token) {
          throw new Error('Mottok ikke token fra API');
      }

      console.log('Innlogging vellykket! Mottatt token:', token);

      // Lagre token og e-post i localStorage
      storeInLocalStorage('accessToken', token);
      storeInLocalStorage('userEmail', email);

      console.log('Token og e-post lagret i localStorage.');

      // Omdiriger til feed-siden
      //window.location.href = '/pages/feed/feed.html';
  } catch (error) {
      console.error('Error logging in:', error);
      throw error;
  }
}

/**
 * Registrerer en ny bruker.
 * @param {Object} userData - Objekt med brukerdata for registrering.
 * @param {string} userData.name - Brukerens brukernavn.
 * @param {string} userData.email - Brukerens e-postadresse.
 * @param {string} userData.password - Brukerens passord.
 * @returns {Promise<void>}
 */
export async function registerUser(userData) {
  try {
      console.log('Starter registrering for:', userData.email);

      const response = await fetch(REGISTER_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Noroff-API-Key': API_KEY, // Legger til API-nøkkelen her
          },
          body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log('Mottatt responsdata:', responseData);

      if (!response.ok) {
          throw new Error(`Registration failed with status ${response.status}`);
      }

      console.log('Registrering vellykket! Bruker opprettet:', responseData);

      // Omdiriger til innloggingssiden etter registrering
      //window.location.href = '/pages/login/login.html';
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
}
 