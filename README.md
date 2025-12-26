# QuantEdge

A modern trading platform application built with React, Node.js, and MongoDB. QuantEdge provides a comprehensive solution for trading management with a landing page, user authentication, and a feature-rich trading dashboard.

## 🚀 Features

- **Landing Page**: Modern, responsive landing page with product information, pricing, and support
- **User Authentication**: Secure signup and login functionality
- **Trading Dashboard**: Real-time trading dashboard with:
  - Portfolio holdings management
  - Order tracking and management
  - Position monitoring
  - Watchlist functionality
  - Interactive charts and analytics
  - Fund management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap** - CSS framework

### Dashboard
- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **Chart.js** - Data visualization
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Jenkins** - CI/CD pipeline
- **Nginx** - Web server (for production builds)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized deployment)
- **MongoDB** (if running locally without Docker)
- **Git**

## 🏗️ Project Structure

```
QuantEdge/
├── backend/                 # Node.js/Express backend API
│   ├── model/              # Mongoose models
│   ├── schemas/            # Database schemas
│   ├── index.js            # Main server file
│   ├── Dockerfile          # Backend container config
│   └── package.json
├── frontend/               # Landing page React app
│   ├── src/
│   │   ├── landing_page/   # Landing page components
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile          # Frontend container config
│   ├── nginx.conf          # Nginx configuration
│   └── package.json
├── dashboard-new/          # Trading dashboard React app
│   ├── src/
│   │   ├── components/     # Dashboard components
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile          # Dashboard container config
│   ├── nginx.conf          # Nginx configuration
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
├── Jenkinsfile             # CI/CD pipeline configuration
└── README.md
```

## 🚀 Getting Started

### Option 1: Docker Compose (Recommended)

The easiest way to run the entire application is using Docker Compose:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd QuantEdge
   ```

2. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend (Landing Page): http://localhost:3000
   - Dashboard: http://localhost:3001
   - Backend API: http://localhost:3002
   - MongoDB: localhost:27017

4. **Stop the services**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```env
   PORT=3002
   MONGO_URL=mongodb://localhost:27017/quantedge
   NODE_ENV=development
   ```

4. **Start MongoDB** (if not using Docker)
   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** (optional, for custom backend URL)
   ```env
   REACT_APP_BACKEND_URL=http://localhost:3002
   REACT_APP_DASHBOARD_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The frontend will be available at http://localhost:3000

#### Dashboard Setup

1. **Navigate to dashboard-new directory**
   ```bash
   cd dashboard-new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** (optional, for custom backend URL)
   ```env
   REACT_APP_BACKEND_URL=http://localhost:3002
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The dashboard will be available at http://localhost:3001

## 🔧 Configuration

### Docker Configuration

The `docker-compose.yml` file configures:
- **MongoDB** service on port 27017
- **Backend** service on port 3002
- **Frontend** service on port 3000
- **Dashboard** service on port 3001

All services are connected via a Docker network for inter-service communication.

## 🏭 CI/CD Pipeline

The project includes a Jenkins pipeline for automated building and pushing images to Dockerhub 

### Jenkins Setup

1. **Create Docker Hub Credentials in Jenkins**
   - Go to Jenkins → Manage Jenkins → Credentials
   - Add new credential:
     - **Kind**: Username with password
     - **Username**: Your Docker Hub username
     - **Password**: Your Docker Hub access token
     - **ID**: `yug02-dockerhub`

2. **Configure Pipeline**
   - Create a new Pipeline job in Jenkins
   - Point to your repository
   - The `Jenkinsfile` will be automatically detected

### Pipeline Stages

1. **Checkout** - Clones the repository
2. **Docker Login** - Authenticates with Docker Hub
3. **Build and Push Images** - Builds and pushes three images in parallel:
   - `yug02/quantedge-backend:latest`
   - `yug02/quantedge-frontend:latest`
   - `yug02/quantedge-dashboard-new:latest`
4. **Cleanup** - Removes local images after pushing

## 🐳 Docker Images

The application uses pre-built Docker images from Docker Hub:

- `yug02/quantedge-backend:latest`
- `yug02/quantedge-frontend:latest`
- `yug02/quantedge-dashboard-new:latest`
- `mongo:7`

To use pre-built images, ensure your `docker-compose.yml` references these images, or build them locally using the provided Dockerfiles.

## 📝 Development

### Building Docker Images Locally

```bash
# Build backend
docker build -t yug02/quantedge-backend:latest -f backend/Dockerfile ./backend

# Build frontend
docker build -t yug02/quantedge-frontend:latest \
  --build-arg REACT_APP_BACKEND_URL=http://localhost:3002 \
  --build-arg REACT_APP_DASHBOARD_URL=http://localhost:3001 \
  -f frontend/Dockerfile ./frontend

# Build dashboard
docker build -t yug02/quantedge-dashboard-new:latest \
  --build-arg REACT_APP_BACKEND_URL=http://localhost:3002 \
  -f dashboard-new/Dockerfile ./dashboard-new
```

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Dashboard tests
cd dashboard-new
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Yug Patel
