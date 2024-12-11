import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

/**
 * Oppdaterer et innlegg basert på ID.
 * @param {string} postId - ID for innlegget som skal oppdateres.
 * @param {Object} updatedData - Data for oppdateringen.
 * @returns {Promise<Object>} - Respons fra API-et.
 */
export async function updatePost(postId, updatedData) {
  const token = retrieveFromLocalStorage('accessToken');
  if (!token) throw new Error("Du må være innlogget for å oppdatere et innlegg.");

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
    console.error("Kunne ikke oppdatere innlegget:", response.status);
    throw new Error("Kunne ikke oppdatere innlegget.");
  }

  const responseData = await response.json();
  console.log("Innlegg oppdatert:", responseData);
  return responseData;
}

