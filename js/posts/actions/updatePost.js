import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

/**
 * Updating a post based on ID.
 * @param {string} postId - ID of the post to be updated.
 * @param {Object} updatedData - Data for the update.
 * @returns {Promise<Object>} - Response from the API.
 */
export async function updatePost(postId, updatedData) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("You must be logged in to update a post.");

  const response = await fetch(`${POSTS_ENDPOINT}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    console.error("Could not update the post:", response.status);
    throw new Error("Could not update the post.");
  }

  const responseData = await response.json();
  console.log("Post updated:", responseData);
  return responseData;
}

