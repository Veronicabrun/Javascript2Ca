  // Hjelpefil for å opprette flere innlegg, sender flere eksempelinnlegg til API
// js/posts/createSamplePosts.js
import { createPost } from './createPost.js';

/**
 * Liste med eksempelinnlegg som skal opprettes.
 */
const examplePosts = [
  {
    title: "Sun Salutation",
    body: "En yoga-sekvens som varmer opp kroppen.",
    media: {
     url: "/images/feed11.jpg",
      alt: "Person practicing Sun Salutation yoga pose.",
    },
    tags: ["yoga", "fitness"],
  },
  {
    title: "Warrior Pose",
    body: "Styrker bena og åpner hoftene.",
    media: {
      url: "/images/feed22.jpg",
      alt: "Person practicing Warrior Pose yoga pose.",
    },
    tags: ["yoga", "strength"],
  },
];

examplePosts.forEach(async (post) => {
  try {
    const response = await createPost(post);
    console.log('Opprettet innlegg:', response);
  } catch (error) {
    console.error('Feil ved oppretting av innlegg:', error);
  }
});

