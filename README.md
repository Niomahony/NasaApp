# NASA Data Explorer 🚀

A beautiful web application that utilizes NASA's Open APIs to showcase space-related data. Built with React frontend and Node.js backend.

## 🌟 Features

- **Astronomy Picture of the Day (APOD)** - Discover stunning daily images from space
- **Mars Rover Photos** - Explore the Red Planet through NASA's rovers
- **Near Earth Objects (NEO)** - Track asteroids and comets near Earth
- **Earth Polychromatic Imaging Camera (EPIC)** - View Earth from space
- **NASA Image and Video Library Search** - Search through NASA's vast media collection

## 🏗️ Project Structure

```
├── frontend/          # React application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/           # Node.js/Express server
│   ├── routes/
│   ├── views/
│   ├── public/
│   ├── app.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- NASA API Key (optional - DEMO_KEY works for testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd nasa-data-explorer
   ```

2. **Install all dependencies**

   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `.env` and add your NASA API key:

   ```env
   NASA_API_KEY=your_api_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## 🔧 Available Scripts

### Root Directory

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install dependencies for all packages

### Backend Directory

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run test` - Run tests

### Frontend Directory

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 API Endpoints

The backend provides the following NASA API endpoints:

### Astronomy Picture of the Day

- `GET /api/nasa/apod` - Get today's APOD
- `GET /api/nasa/apod?date=2024-01-01` - Get APOD for specific date
- `GET /api/nasa/apod?count=5` - Get multiple APODs

### Mars Rover Photos

- `GET /api/nasa/mars-photos` - Get Mars photos from Curiosity rover
- `GET /api/nasa/mars-photos?earth_date=2024-01-01` - Get photos for specific date
- `GET /api/nasa/mars-photos?camera=fhaz` - Filter by camera

### Near Earth Objects

- `GET /api/nasa/neo` - Get NEO data for today
- `GET /api/nasa/neo?start_date=2024-01-01&end_date=2024-01-07` - Get NEO data for date range

### Earth Polychromatic Imaging Camera

- `GET /api/nasa/epic` - Get latest EPIC images

### NASA Image and Video Library

- `GET /api/nasa/search?q=mars` - Search NASA's media library

## 🎨 Frontend Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI/UX** - Beautiful space-themed design with animations
- **Interactive Components** - Smooth transitions and hover effects
- **Data Visualization** - Charts and graphs for space data
- **Search & Filtering** - Advanced search capabilities
- **Loading States** - Professional loading indicators

## 🔒 Security Features

- **CORS Configuration** - Secure cross-origin requests
- **Helmet.js** - Security headers
- **Environment Variables** - Secure API key management
- **Input Validation** - Sanitized API requests

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `frontend/build` folder

### Backend (Render/Heroku)

1. Set environment variables
2. Deploy the `backend` folder
3. Configure the production URL

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)

```env
NASA_API_KEY=your_nasa_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [NASA Open APIs](https://api.nasa.gov/) for providing the amazing space data
- React and Node.js communities for excellent documentation
- All the amazing space imagery that inspires us

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using NASA's Open APIs
