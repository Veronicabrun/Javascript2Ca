import { POSTS_ENDPOINT, API_KEY } from '../config/constants.js';
import { retrieveFromLocalStorage } from '../utilities/localStorage.js';

/**
 * Funksjon for å opprette et nytt innlegg.
 */
export async function createNewPost(postData) {
  console.log("Starter oppretting av innlegg...");

  const token = retrieveFromLocalStorage('accessToken');
  if (!token) {
    console.error("Brukeren er ikke logget inn.");
    throw new Error("Du må være innlogget for å opprette et innlegg.");
  }

  const response = await fetch(POSTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    console.error("Kunne ikke opprette innlegget:", response.status);
    throw new Error("Kunne ikke opprette innlegget.");
  }

  const responseData = await response.json();
  console.log("Innlegg opprettet:", responseData);
  return responseData;
}
