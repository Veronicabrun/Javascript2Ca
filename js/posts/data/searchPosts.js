import { SEARCH_POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

export async function searchPosts(query) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("The user is not logged in.");

  const response = await fetch(SEARCH_POSTS_ENDPOINT(query), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) throw new Error("Could not retrieve search results.");
  const data = await response.json();
  return data.data; 
}
