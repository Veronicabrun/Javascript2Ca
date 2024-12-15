import { API_BASE_URL, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

/**
 * Fetching the posts of the logged-in user from the Noroff API.
 * @returns {Promise<Array>} - List of the user's posts.
 */
export async function getUserPosts() {
  const token = retrieveFromLocalStorage('accessToken');
  const username = retrieveFromLocalStorage('username');
  

  if (!token || !username) {
    throw new Error('You must be logged in to fetch posts.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/social/profiles/${username}/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch posts for the profile ${username}.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching posts:', error);
    throw error;
  }
}


