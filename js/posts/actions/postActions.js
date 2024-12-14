import { updatePost } from './updatePost.js';
import { deletePost } from './deletePost.js';
/**
 * Handling post update and deletion.
 * @param {string} postId - ID of the current post.
 */
export function setupPostActions(postId) {
  console.log(`Initializing update and deletion for the post with ID: ${postId}`);

  const editForm = document.getElementById('edit-post-form');
  const deleteButton = document.getElementById('delete-post-button');

 // Handle post update
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedData = {
      title: document.getElementById('edit-post-title').value.trim(),
      body: document.getElementById('edit-post-body').value.trim(),
    };

    try {
      console.log("Sending update data to the API:", updatedData);
      await updatePost(postId, updatedData);
      alert("The post has been updated!");
      window.location.reload(); // Refresh the page to display the changes
    } catch (error) {
      console.error("Error while updating the post:", error);
      alert("Could not update the post. Please try again.");
    }
  });

  // Handle post deletion
  deleteButton.addEventListener('click', async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deletePost(postId);
      alert("The post has been deleted!");
      window.location.href = '/pages/feed/feed.html'; 
    } catch (error) {
      console.error("Error while deleting the post:", error);
      alert("Could not delete the post. Please try again.");
    }
  });
}

