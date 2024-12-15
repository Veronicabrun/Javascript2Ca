import { POSTS_ENDPOINT, API_KEY } from '../../config/constants.js';
import { retrieveFromLocalStorage } from '../../utilities/localStorage.js';
/**
 * Function to create a new post
 */
export async function createNewPost(postData) {
  console.log("Starting post creation...");

  const token = retrieveFromLocalStorage('accessToken');
  if (!token) {
    console.error("The user is not logged in.");
    throw new Error("You must be logged in to create a post.");
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
    console.error("Could not create the post:", response.status);
    throw new Error("Could not create the post.");
  }

  const responseData = await response.json();
  console.log("Post created:", responseData);
  return responseData;
}
