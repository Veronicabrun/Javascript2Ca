import { SEARCH_POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

export async function searchPosts(query) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("Brukeren er ikke logget inn.");

  const response = await fetch(SEARCH_POSTS_ENDPOINT(query), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) throw new Error("Kunne ikke hente søkeresultater.");
  const data = await response.json();
  return data.data; // Returnerer kun listen over innlegg
}
