import { getPostById } from './getPostById.js';

// Hent eksisterende HTML-elementer
const postTitleElement = document.querySelector('.card-title');
const postAuthorElement = document.querySelector('.text-muted');
const postBodyElement = document.querySelector('.card-text');
const postImageElement = document.querySelector('.post-image');

// Hent URL-parametere for å finne post-ID
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Konsoll-logg for å sjekke at post-ID er hentet riktig
console.log("URL-parametere:", urlParams.toString());
console.log("Hentet post-ID:", postId);

if (!postId) {
  document.querySelector('.card').innerHTML = '<p class="text-danger">Ingen post-ID spesifisert. Gå tilbake til feeden.</p>';
  console.error("Ingen post-ID spesifisert i URL-en.");
} else {
  displayPost(postId);
}

async function displayPost(postId) {
  try {
    console.log(`Henter innlegg med ID: ${postId} fra API...`);
    const post = (await getPostById(postId)).data;

    console.log("Mottatt innlegg fra API:", post);

    // Oppdater eksisterende HTML med innleggsdata
    postTitleElement.textContent = post.title;
    postAuthorElement.textContent = `Posted by ${post.author?.name || 'Unknown'} | ${new Date(post.created).toLocaleDateString()}`;
    postBodyElement.textContent = post.body;

    if (post.media?.url) {
      postImageElement.src = post.media.url;
      postImageElement.alt = post.media.alt || post.title || 'Post Image';
    } else {
      postImageElement.remove(); // Fjern bildet hvis det ikke finnes
    }

    console.log("Innlegg oppdatert i eksisterende HTML.");
  } catch (error) {
    console.error("Feil ved henting av innlegg:", error);
    document.querySelector('.card').innerHTML = '<p class="text-danger">Kunne ikke laste inn innlegget. Prøv igjen senere.</p>';
  }
}

