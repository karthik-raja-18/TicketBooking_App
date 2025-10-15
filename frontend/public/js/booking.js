const form = document.getElementById('bookingForm');
const messageDiv = document.getElementById('message');
const dateInput = document.getElementById('date');

const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value
    };

    try {
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Booking created successfully! Redirecting to bookings page...', 'success');
            form.reset();

            setTimeout(() => {
                window.location.href = '/bookings.html';
            }, 2000);
        } else {
            showMessage(data.error || 'Failed to create booking. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please check your connection and try again.', 'error');
        console.error('Error:', error);
    }
});
