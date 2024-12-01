import { updatePost } from './updatePost.js';
import { deletePost } from './deletePost.js';

/**
 * Håndterer oppdatering og sletting av innlegg.
 * @param {string} postId - ID for det aktuelle innlegget.
 */
export function setupPostActions(postId) {
  console.log(`Initialiserer oppdatering og sletting for innlegg med ID: ${postId}`);

  const editForm = document.getElementById('edit-post-form');
  const deleteButton = document.getElementById('delete-post-button');

  // Håndter oppdatering av innlegg
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedData = {
      title: document.getElementById('edit-post-title').value.trim(),
      body: document.getElementById('edit-post-body').value.trim(),
    };

    try {
      console.log("Sender oppdateringsdata til API:", updatedData);
      await updatePost(postId, updatedData);
      alert("Innlegget ble oppdatert!");
      window.location.reload(); // Oppdater siden for å vise endringene
    } catch (error) {
      console.error("Feil ved oppdatering av innlegg:", error);
      alert("Kunne ikke oppdatere innlegget. Prøv igjen.");
    }
  });

  // Håndter sletting av innlegg
  deleteButton.addEventListener('click', async () => {
    const confirmDelete = confirm("Er du sikker på at du vil slette dette innlegget?");
    if (!confirmDelete) return;

    try {
      await deletePost(postId);
      alert("Innlegget ble slettet!");
      window.location.href = '/pages/feed/feed.html'; // Tilbake til feed-siden
    } catch (error) {
      console.error("Feil ved sletting av innlegg:", error);
      alert("Kunne ikke slette innlegget. Prøv igjen.");
    }
  });
}

