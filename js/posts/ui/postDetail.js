import { getPostById } from '../data/getPostById.js';
import { setupPostActions } from '../actions/postActions.js';
import { showLoadingIndicator, hideLoadingIndicator } from '../ui/loadingIndicator.js'; 

// Fetch existing HTML elements
const postTitleElement = document.querySelector('.card-title');
const postAuthorElement = document.querySelector('.text-muted');
const postBodyElement = document.querySelector('.card-text');
const postImageElement = document.querySelector('.post-image');

// Fetch URL parameters to find the post ID
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Console log to verify that the post ID is fetched correctly
console.log("URL-parametere:", urlParams.toString());
console.log("Hentet post-ID:", postId);

if (!postId) {
  document.querySelector('.card').innerHTML = '<p class="text-danger">No post ID specified. Go back to the feed.</p>';
  console.error("No post ID specified in the URL.");
} else {
  displayPost(postId);
  setupPostActions(postId); // Added: Initialize update and delete
}

async function displayPost(postId) {
  try {
    showLoadingIndicator(); 

    console.log(`Fetching post with ID: ${postId} from the API...`);
    const post = (await getPostById(postId)).data;

    console.log("Received post from the API:", post);

    // Update existing HTML with post data
    postTitleElement.textContent = post.title;
    postAuthorElement.textContent = `Posted by ${post.author?.name || 'Unknown'} | ${new Date(post.created).toLocaleDateString()}`;
    postBodyElement.textContent = post.body;

    if (post.media?.url) {
      postImageElement.src = post.media.url;
      postImageElement.alt = post.media.alt || post.title || 'Post Image';
    } else {
      postImageElement.remove();
    }

    console.log("Post updated in existing HTML.");
  } catch (error) {
    console.error("Error while fetching the post:", error);
    document.querySelector('.card').innerHTML = '<p class="text-danger">Could not load the post. Please try again later</p>';
  } finally {
    hideLoadingIndicator(); 
  }
}

