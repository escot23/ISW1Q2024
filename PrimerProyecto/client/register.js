const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeat-password');
    const pin = formData.get('pin');
    const name = formData.get('name');
    const lastName = formData.get('last-name');
    const country = formData.get('country');
    const dateOfBirth = formData.get('date-of-birth');

    try {
        const response = await fetch('/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email, 
                password, 
                repeatPassword, 
                pin, 
                name, 
                lastName, 
                country, 
                dateOfBirth 
            })
        });

        if (response.ok) {
            const { message } = await response.json();
            alert(message);
            // Redirigir al usuario a la página de inicio de sesión, por ejemplo:
            window.location.href = 'http://localhost:3000/api/index';
        } else {
            const { message } = await response.json();
            alert(message);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
});
