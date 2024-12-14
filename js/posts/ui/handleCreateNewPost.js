import { createNewPost } from '../actions/createNewPost.js';
/**
 *Initializing the form for creating posts
 */
export function setupCreateNewPostForm() {
  console.log("Initializing form for creating a new post...");

  const form = document.getElementById('create-post-form');

  if (!form) {
    console.error("Form for creating posts was not found in the HTML.");
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    console.log("The submit button was clicked, retrieving values from the form...");

    // Get the values from the form
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();
    const media = document.getElementById('post-media').value.trim();
    const tags = document.getElementById('post-tags').value
      .split(',')
      .map(tag => tag.trim());

    console.log("Retrieved values:", { title, body, media, tags });

    // Create the postData object
    const postData = {
      title,
      body,
      media: media ? { url: media } : null, // Media must be an object if it is a URL

      tags: tags.length > 0 ? tags : [], // Use an empty list if no tags are provided
    };

    try {
      console.log("Sending post data to the API:", postData);

      // Send data to the API to create a post
      const response = await createNewPost(postData);

      console.log("Response from the API:", response);
      alert("The post was created!");

      // Reset the form
      form.reset();

      // Update the feed dynamically
      window.location.reload(); // Alternative: Call renderPosts() for dynamic updating
    } catch (error) {
      console.error("Error while creating the post:", error);
      alert("Could not create the post. Please try again.");
    }
  });
}

/**
 * Initializing the form when the file loads.
 */
setupCreateNewPostForm();






