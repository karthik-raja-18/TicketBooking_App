const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const noBookingsDiv = document.getElementById('noBookings');
const bookingsListDiv = document.getElementById('bookingsList');

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function createBookingElement(booking) {
    const bookingDiv = document.createElement('div');
    bookingDiv.className = 'booking-item';

    bookingDiv.innerHTML = `
        <h3>${booking.destination}</h3>
        <div class="booking-details">
            <div class="booking-detail">
                <strong>Name</strong>
                <span>${booking.name}</span>
            </div>
            <div class="booking-detail">
                <strong>Email</strong>
                <span>${booking.email}</span>
            </div>
            <div class="booking-detail">
                <strong>Travel Date</strong>
                <span>${formatDate(booking.date)}</span>
            </div>
            <div class="booking-detail">
                <strong>Booked On</strong>
                <span>${formatDate(booking.createdAt)}</span>
            </div>
        </div>
    `;

    return bookingDiv;
}

async function loadBookings() {
    try {
        const response = await fetch('/api/bookings');

        if (!response.ok) {
            throw new Error('Failed to load bookings');
        }

        const data = await response.json();
        loadingDiv.style.display = 'none';

        if (data.bookings.length === 0) {
            noBookingsDiv.style.display = 'block';
        } else {
            data.bookings.forEach(booking => {
                const bookingElement = createBookingElement(booking);
                bookingsListDiv.appendChild(bookingElement);
            });
        }
    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.textContent = 'Failed to load bookings. Please try again later.';
        errorDiv.style.display = 'block';
        console.error('Error:', error);
    }
}

loadBookings();
