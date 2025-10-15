const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

let bookings = [];

function loadBookings() {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
      bookings = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading bookings:', error);
    bookings = [];
  }
}

function saveBookings() {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error('Error saving bookings:', error);
  }
}

loadBookings();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.get('/api/version', (req, res) => {
  res.json({ version: 'v1.0', app: 'TravelGo' });
});

app.post('/api/book', (req, res) => {
  const { name, email, destination, date } = req.body;

  if (!name || !email || !destination || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const booking = {
    id: Date.now(),
    name,
    email,
    destination,
    date,
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  saveBookings();

  res.status(201).json({ message: 'Booking created successfully', booking });
});

app.get('/api/bookings', (req, res) => {
  res.json({ bookings });
});

app.listen(PORT, () => {
  console.log(`TravelGo server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
