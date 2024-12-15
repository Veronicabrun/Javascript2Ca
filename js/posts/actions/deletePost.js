import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';
/**
 * Deleting a post based on ID.
 * @param {string} postId - ID of the post to be deleted.
 * @returns {Promise<void>}
 */
export async function deletePost(postId) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("You must be logged in to delete a post");

  const response = await fetch(`${POSTS_ENDPOINT}/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    console.error("Could not delete the post:", response.status);
    throw new Error("Could not delete the post.");
  }

  console.log("Post deleted.");
}
