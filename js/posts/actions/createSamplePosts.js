import { createPost } from './createPost.js';

const examplePosts = [
  {
    title: "Sun Salutation",
    body: "En yoga-sekvens som varmer opp kroppen.",
    media: {
      url: "https://images.pexels.com/photos/4534660/pexels-photo-4534660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "A woman practicing an exercise where she is standing on her head.",
    },
    tags: ["yoga", "fitness"],
  },
  {
    title: "Warrior Pose",
    body: "Styrker bena og åpner hoftene.",
    media: {
      url: "https://images.pexels.com/photos/4534594/pexels-photo-4534594.jpeg",
      alt: "A woman practicing an exercise on one leg with one hand on the ground.",
    },
    tags: ["yoga", "strength"],
  },
];

for (const post of examplePosts) {
  try {
    const response = await createPost(post);
    console.log('Post created:', response);
  } catch (error) {
    console.error('Error while creating the post:', error);
  }
}


