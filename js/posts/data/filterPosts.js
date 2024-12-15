export function filterPosts(posts, sortBy) {
    console.log("Filtering posts based on:", sortBy); 
    switch (sortBy) {
      case 'newest':
        return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
      case 'oldest':
        return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
      case 'popular':
        return posts.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0));
      default:
        return posts;
    }
  }
  