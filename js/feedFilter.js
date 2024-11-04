async function fetchPosts() {
    const jwtToken = localStorage.getItem('accessToken');
    if (!jwtToken) {
        console.error('No JWT token found! You must be logged in to view posts.');
        return;
    }

    try {
        const response = await fetch('https://v2.api.noroff.dev/social/posts?_tag=unityyoga', {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'X-Noroff-API-Key': '05e991e0-643b-41bd-b4a7-701ca4ae441f'
            }
        });

        console.log("Response status for GET:", response.status);

        if (!response.ok) {
            throw new Error('Failed to fetch posts.');
        }

        const posts = await response.json();
        console.log('Posts fetched:', posts);

        // Check if posts.data is an array before iterating over it
        if (Array.isArray(posts.data) && posts.data.length > 0) {
            displayPosts(posts.data);
        } else {
            console.log("No posts found with the specific tag.");
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // Clear the list before adding new posts

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('list-group-item', 'd-flex', 'flex-column', 'flex-md-row', 'align-items-start');

        postItem.innerHTML = `
            <a href="/pages/post/post-detail.html?id=${post.id}">
                <img src="${post.media?.url || '/images/default.jpg'}" class="me-3 mt-2 mb-2 image-size" alt="${post.media?.alt || 'Image'}">
            </a>
            <div>
                <h5 class="mb-1 mt-2">${post.title}</h5>
                <p class="mb-1">${post.body}</p>
            </div>
        `;

        postList.appendChild(postItem);
    });
}

// Call the function to fetch posts when the page loads
fetchPosts();
