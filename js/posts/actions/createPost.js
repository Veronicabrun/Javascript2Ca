import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';

export async function createPost(postData) {
  console.log("Starting the createPost function");
  const token = retrieveFromLocalStorage('accessToken');

  console.log("Token retrieved from localStorage:", token);

  if (!token) {
    console.error("No token found. The user is not logged in.");
    throw new Error('You must be logged in to create posts.');
  }

  try {
    console.log("Sending post to the API with data:", postData);
    const response = await fetch(POSTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(postData),
    });

    console.log("Response status from the API:", response.status);

    const responseData = await response.json();
    console.log("Response status from the API:", responseData);

    if (!response.ok) {
      throw new Error(`Could not create the post: ${responseData.errors ? responseData.errors[0]?.message : "Unknown error"}`);
    }

    return responseData;
  } catch (error) {
    console.error("Error while creating the post:", error);
    throw error;
  }
}


