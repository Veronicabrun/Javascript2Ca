import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

/**
 * Sletter et innlegg basert på ID.
 * @param {string} postId - ID for innlegget som skal slettes.
 * @returns {Promise<void>}
 */
export async function deletePost(postId) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("Du må være innlogget for å slette et innlegg.");

  const response = await fetch(`${POSTS_ENDPOINT}/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    console.error("Kunne ikke slette innlegget:", response.status);
    throw new Error("Kunne ikke slette innlegget.");
  }

  console.log("Innlegg slettet.");
}
