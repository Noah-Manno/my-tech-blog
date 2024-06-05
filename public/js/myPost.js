document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('blog-posts-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('card-title')) {
            const blogPost = event.target.closest('.blog-post');
            if (blogPost) {
                const postId = blogPost.getAttribute('data-post-id');
            
                console.log('Clicked on blog post with ID:', postId);
            
                window.location.href = '/mypost/' + postId;
            }
        }
    });
});