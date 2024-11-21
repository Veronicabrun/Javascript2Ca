import { POSTS_ENDPOINT, API_KEY } from '../config/constants.js';
import { retrieveFromLocalStorage } from '../utilities/localStorage.js';

export async function createPost(postData) {
  console.log("Starter createPost-funksjonen");
  const token = retrieveFromLocalStorage('accessToken');

  console.log("Token hentet fra localStorage:", token);

  if (!token) {
    console.error("Ingen token funnet. Brukeren er ikke innlogget.");
    throw new Error('Du må være innlogget for å opprette innlegg.');
  }

  try {
    console.log("Sender innlegg til API med data:", postData);
    const response = await fetch(POSTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(postData),
    });

    console.log("Responsstatus fra API:", response.status);

    const responseData = await response.json();
    console.log("Responsdata fra API:", responseData);

    if (!response.ok) {
      throw new Error(`Kunne ikke opprette innlegg: ${responseData.errors ? responseData.errors[0]?.message : "Ukjent feil"}`);
    }

    return responseData;
  } catch (error) {
    console.error("Feil ved oppretting av innlegg:", error);
    throw error;
  }
}


