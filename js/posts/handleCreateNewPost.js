import { createNewPost } from './createNewPost.js';

/**
 * Initialiserer skjemaet for opprettelse av innlegg.
 */
export function setupCreateNewPostForm() {
  console.log("Initialiserer skjema for opprettelse av nytt innlegg...");

  const form = document.getElementById('create-post-form');

  if (!form) {
    console.error("Skjema for opprettelse av innlegg ble ikke funnet i HTML.");
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Hindrer siden fra å laste inn på nytt

    console.log("Submit-knappen ble trykket, henter verdier fra skjemaet...");

    // Hent verdiene fra skjemaet
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();
    const media = document.getElementById('post-media').value.trim();
    const tags = document.getElementById('post-tags').value
      .split(',')
      .map(tag => tag.trim());

    console.log("Hentede verdier:", { title, body, media, tags });

    // Opprett postData-objektet
    const postData = {
      title,
      body,
      media: media || null, // Bruk null hvis ingen media-URL er oppgitt
      tags: tags.length > 0 ? tags : [], // Bruk tom liste hvis ingen tags
    };

    try {
      console.log("Sender innleggsdata til API:", postData);

      // Send data til API for å opprette innlegg
      const response = await createNewPost(postData);

      console.log("Respons fra API:", response);
      alert("Innlegget ble opprettet!");

      // Nullstill skjemaet
      form.reset();

      // Oppdater feeden dynamisk
      window.location.reload(); // Alternativ: Kall `renderPosts()` for dynamisk oppdatering
    } catch (error) {
      console.error("Feil ved oppretting av innlegg:", error);
      alert("Kunne ikke opprette innlegget. Prøv igjen.");
    }
  });
}

/**
 * Initialiserer skjemaet når filen lastes.
 */
setupCreateNewPostForm();






