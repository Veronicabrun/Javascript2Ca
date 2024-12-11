import { API_BASE_URL, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

/**
 * Henter innleggene til den innloggede brukeren fra Noroff API.
 * @returns {Promise<Array>} - Liste over brukerens innlegg.
 */
export async function getUserPosts() {
  const token = retrieveFromLocalStorage('accessToken');
  const username = retrieveFromLocalStorage('username');
  

  if (!token || !username) {
    throw new Error('Du må være innlogget for å hente innlegg.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/social/profiles/${username}/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Kunne ikke hente innlegg for profilen ${username}.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Feil ved henting av innlegg:', error);
    throw error;
  }
}


