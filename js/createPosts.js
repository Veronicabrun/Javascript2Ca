async function createPosts() {
    const jwtToken = localStorage.getItem('accessToken');
    if (!jwtToken) {
        console.error('No JWT token found! You must be logged in to create posts.');
        return;
    }

    // Create posts with title, image, and text
    const posts = [
        {
            title: "Sun Salutation",
            body: "A dynamic sequence that warms up the body. Start in Mountain Pose, flow through Forward Bend, Plank, Cobra, and Downward Dog. This sequence energizes and enhances flexibility.",
            media: { url: "/images/feed11.jpg", alt: "Sun Salutation Image" },
            tags: ["unityyoga"],
        },
        {
            title: "Warrior II",
            body: "Stand with feet wide, bend the front knee, and extend arms parallel to the ground. Gaze over your front hand. This pose builds strength and stability while opening the hips and chest.",
            media: { url: "/images/feed22.jpg", alt: "Warrior II Image" },
            tags: ["unityyoga"],
        },
        {
            title: "Child's Pose",
            body: "A restful position that encourages relaxation. Kneel with toes together, sit on your heels, and lean forward, resting your forehead on the mat. This pose calms the mind and stretches the back.",
            media: { url: "/images/feed3.jpg", alt: "Child's Pose Image" },
            tags: ["unityyoga"],
        },
        {
            title: "Cobra Pose",
            body: "Lie on your stomach, place hands under shoulders, and lift your chest while keeping elbows close. This pose strengthens the back and opens the chest, improving posture.",
            media: { url: "/images/feed4.jpg", alt: "Cobra Pose Image" },
            tags: ["unityyoga"],
        }
    ];

    for (const post of posts) {
        try {
            // Log the request before sending it
            console.log('Sending request to create post:', post);

            const response = await fetch('https://v2.api.noroff.dev/social/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                    'X-Noroff-API-Key': '05e991e0-643b-41bd-b4a7-701ca4ae441f'
                },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                    media: post.media,
                    tags: post.tags
                })
            });

            // Log the status of the response after it is received
            console.log('Response status for creation:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to create post: ${post.title}`);
            }

            const result = await response.json();
            console.log('Post created:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Call the function to create posts
createPosts();
