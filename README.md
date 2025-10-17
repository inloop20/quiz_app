# Quiz App 🧠

A real-time multiplayer quiz application built with React and WebSocket technology. Test your knowledge, compete with others, and climb the leaderboard!

## ✨ Features

- **Real-time Multiplayer**: Compete with other players in real-time
- **Dynamic Questions**: 50 unique questions with randomized selection
- **Live Leaderboard**: Track scores and rankings instantly
- **WebSocket Integration**: Seamless real-time communication
- **Responsive Design**: Built with Tailwind CSS for all devices
- **Redis Backend**: Fast data storage and retrieval

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool with Rolldown
- **Tailwind CSS 4** - Utility-first styling
- **WebSocket** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **WebSocket Server** - Real-time connections
- **Redis** - In-memory data store
- **dotenv** - Environment configuration

## 📁 Project Structure

```
quiz_app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.jsx         # Main application component
│   │   ├── socket.js       # WebSocket client logic
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── index.js            # Main server file
│   ├── question.js         # Quiz questions data
│   ├── util.js             # Utility functions
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Redis server
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/inloop20/quiz_app.git
cd quiz_app
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
REDIS_URL=redis://localhost:6379
PORT=3000
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

### 4. Start Redis Server
Make sure Redis is running on your system:
```bash
redis-server
```

### 5. Run the Application

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 🎮 How to Play

1. **Enter Username**: Start by entering your username
2. **Answer Questions**: Click on the correct answer from multiple choices
3. **Earn Points**: Get points for correct answers
4. **Check Leaderboard**: See your ranking against other players
5. **Keep Playing**: Questions are randomly selected from a pool of 50

## 🏗️ Architecture

### Real-time Communication
- WebSocket connections handle real-time data exchange
- Questions are fetched dynamically from the server
- Leaderboard updates instantly when scores change

### Data Flow
1. Client connects via WebSocket
2. Server generates random questions from the pool
3. User answers are validated server-side
4. Scores are stored in Redis
5. Leaderboard is updated and broadcast to all clients

## 🔧 Development

### Available Scripts

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Server:**
- `npm run dev` - Start development server with nodemon

### Code Quality
- ESLint configuration for consistent code style
- React hooks and refresh plugins for development
- Modern ES modules throughout the project

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
1. Set up Redis on your production server
2. Configure environment variables
3. Deploy the server directory to your hosting service
4. Ensure WebSocket connections are properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check existing [Issues](https://github.com/inloop20/quiz_app/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Question categories and difficulty levels
- [ ] Private quiz rooms
- [ ] Question submission by users
- [ ] Mobile app version
- [ ] Statistics and analytics dashboard

---

**Built with ❤️ by [inloop20](https://github.com/inloop20)**