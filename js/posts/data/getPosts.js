import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

/**
 * Fetching all posts from the API
 * @returns {Promise<Array>} - List of posts.
 */
export async function getPosts() {
  const token = retrieveFromLocalStorage('accessToken');

  if (!token) {
    throw new Error('You must be logged in to fetch posts.');
  }

  try {
    const response = await fetch(POSTS_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Error while fetching posts.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error while fetching posts:', error);
    throw error;
  }
}

  