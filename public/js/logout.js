const logoutHandler = async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/login')
        } else {
            alert('Could not logout');
        }
};

const logoutLink = document.querySelector('#logout-link')
logoutLink.addEventListener('click', logoutHandler)
const logoutLinkMobile = document.querySelector('#logout-link-mobile')
logoutLinkMobile.addEventListener('click', logoutHandler)
