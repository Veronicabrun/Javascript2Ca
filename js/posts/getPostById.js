import { POST_BY_ID_ENDPOINT, API_KEY } from '../config/constants.js';
import { retrieveFromLocalStorage } from '../utilities/localStorage.js';

export async function getPostById(postId) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("Brukeren er ikke logget inn.");

  const response = await fetch(POST_BY_ID_ENDPOINT(postId), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) throw new Error(`Kunne ikke hente innlegg med ID: ${postId}`);

  const data = await response.json();
  return data; // Returnerer detaljene for innlegget
}
