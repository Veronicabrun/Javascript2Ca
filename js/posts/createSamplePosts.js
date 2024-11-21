import { createPost } from './createPost.js';

const examplePosts = [
  {
    title: "Sun Salutation",
    body: "En yoga-sekvens som varmer opp kroppen.",
    media: {
      url: "https://images.unsplash.com/photo-1731921954767-8473de81c99e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person practicing Sun Salutation yoga pose.",
    },
    tags: ["yoga", "fitness"],
  },
  {
    title: "Warrior Pose",
    body: "Styrker bena og åpner hoftene.",
    media: {
      url: "https://images.unsplash.com/photo-1731921954767-8473de81c99e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person practicing Warrior Pose yoga pose.",
    },
    tags: ["yoga", "strength"],
  },
];

for (const post of examplePosts) {
  try {
    const response = await createPost(post);
    console.log('Opprettet innlegg:', response);
  } catch (error) {
    console.error('Feil ved oppretting av innlegg:', error);
  }
}


