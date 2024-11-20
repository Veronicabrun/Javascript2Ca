import { POSTS_ENDPOINT, API_KEY } from '../config/constants.js';
import { retrieveFromLocalStorage } from '../utilities/localStorage.js';

/**
 * Henter alle innlegg fra API-et.
 * @returns {Promise<Array>} - Liste over innlegg.
 */
export async function getPosts() {
  const token = retrieveFromLocalStorage('accessToken');

  if (!token) {
    throw new Error('Du må være innlogget for å hente innlegg.');
  }

  try {
    const response = await fetch(POSTS_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Feil ved henting av innlegg.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Feil ved henting av innlegg:', error);
    throw error;
  }
}

  