// Sender ett innlegg til API

// js/posts/createPost.js
import { POSTS_ENDPOINT, API_KEY } from '../config/constants.js';
import { retrieveFromLocalStorage } from '../utilities/localStorage.js'; // Bruker riktig funksjonsnavn

/**
 * Oppretter et nytt innlegg i API-et.
 * @param {Object} postData - Data for innlegget.
 * @returns {Promise<Object>} - Responsen fra API-et.
 */
export async function createPost(postData) {
  const token = retrieveFromLocalStorage('accessToken'); // Henter token med riktig funksjon

  if (!token) {
    throw new Error('Du må være innlogget for å opprette innlegg.');
  }

  try {
    console.log('Sender innlegg til API:', postData); // Logger innleggsdata.
    const response = await fetch(POSTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Bruker token for autentisering
        'X-Noroff-API-Key': API_KEY, // Legger til API-nøkkelen
      },
      body: JSON.stringify(postData), // Konverterer til JSON-struktur
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Feil ved oppretting av innlegg: ${errorMessage.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Feil ved oppretting av innlegg:', error);
    throw error;
  }
}
