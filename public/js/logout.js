const logoutHandler = async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            body: JSON.stringify(req.session.logged_in),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Could not logout');
        }
};

const logoutLinks = document.querySelector('#logout-link')
console.log(logoutLinks)
logoutLinks.addEventListener('click', logoutHandler)
