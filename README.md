# TravelGo v1.0 - Travel Booking Web Application

A lightweight full-stack travel booking application perfect for DevOps CI/CD demonstrations.

## Features

- **Home Page**: Welcome message with popular travel destinations
- **Booking Page**: Form to create new travel bookings
- **Bookings Page**: View all submitted bookings
- **REST API**: Backend endpoints for booking management
- **Data Persistence**: Bookings stored in JSON file
- **Dockerized**: Ready for containerization and deployment

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Storage**: JSON file (in-memory with file persistence)
- **Container**: Docker

## Project Structure

```
project/
├── backend/
│   ├── index.js           # Express server with REST API
│   ├── package.json       # Backend dependencies
│   └── bookings.json      # Data storage file
├── frontend/
│   └── public/
│       ├── index.html     # Home page
│       ├── booking.html   # Booking form page
│       ├── bookings.html  # View bookings page
│       ├── css/
│       │   └── styles.css # Styling
│       └── js/
│           ├── booking.js # Booking form logic
│           └── bookings.js # Bookings display logic
├── Dockerfile             # Container configuration
└── README.md              # Documentation
```

## API Endpoints

| Method | Endpoint        | Description                  |
|--------|----------------|------------------------------|
| GET    | /              | Serves home page             |
| GET    | /api/version   | Get application version      |
| POST   | /api/book      | Create a new booking         |
| GET    | /api/bookings  | Retrieve all bookings        |

### POST /api/book Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "destination": "Paris, France",
  "date": "2025-12-25"
}
```

## Getting Started

### Prerequisites

- Node.js 18+ (for local development)
- Docker (for containerized deployment)

### Local Development

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Access the application**
   ```
   Open your browser and navigate to: http://localhost:8080
   ```

## Docker Deployment

### Build Docker Image

```bash
docker build -t travelgo:v1.0 .
```

### Run Docker Container

```bash
docker run -p 8080:8080 travelgo:v1.0
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## Docker Commands Reference

| Command | Description |
|---------|-------------|
| `docker build -t travelgo:v1.0 .` | Build the Docker image |
| `docker images` | List all Docker images |
| `docker run -p 8080:8080 travelgo:v1.0` | Run container on port 8080 |
| `docker run -d -p 8080:8080 travelgo:v1.0` | Run container in detached mode |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop <container_id>` | Stop a running container |
| `docker rm <container_id>` | Remove a container |
| `docker rmi travelgo:v1.0` | Remove the image |

## Usage

1. **Visit Home Page**: Browse popular destinations
2. **Make a Booking**: Click "Book Now" and fill out the form
3. **View Bookings**: Navigate to "My Bookings" to see all reservations

## CI/CD Integration

This application is designed to be CI/CD friendly:

- Simple build process
- Single Dockerfile for containerization
- Runs on standard port 8080
- No external database dependencies
- Easy to test and deploy

### Example CI/CD Pipeline Steps

1. Clone repository
2. Build Docker image
3. Run container
4. Run tests (if applicable)
5. Push to registry
6. Deploy to target environment

## Development Notes

- Bookings are stored in `backend/bookings.json`
- Data persists between server restarts
- In-memory array with file synchronization
- CORS enabled for development

## License

MIT License - Free to use for learning and demonstration purposes.

## Author

Built for DevOps CI/CD demonstrations
