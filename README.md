# 🛳️ Battleship – Multiplayer Game

A modern implementation of the classic **Battleship** game with drag-and-drop ship placement, random match mode, and the ability to play against your friend.  
Built with **React + TypeScript** on the frontend and **Node.js + WebSockets + Redis** on the backend.

---

## ✨ Features

- 🎮 **Drag & Drop Ships** – intuitive ship placement using React DnD logic.  
- 🤖 **Random Matchmaking** – quickly find a random opponent to start playing.  
- 👥 **Play with a Friend** – share a room code and battle directly with a friend.  
- ⚡ **Real-time Gameplay** – powered by **WebSockets** for instant move updates.  
- 🧠 **State Management** – Redis is used to handle multiplayer sessions and game state.  
- 📱 **Responsive Design** – optimized for both desktop and mobile play.  

---

## 🛠 Tech Stack

**Frontend**  
- React + TypeScript  
- React Router  
- Drag-and-Drop logic for ship placement  

**Backend**  
- Node.js + TypeScript  
- WebSockets (real-time communication)  
- Redis (session & game state storage)  

**Other**  
- Prisma + PostgreSQL (optional, for persistence if needed)  
- Docker (for local development setup)  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/battleship.git
cd battleship
```

### 2. Install dependencies
```bash
cd frontend
npm install

cd backend
npm install
```

### 3. Run with Docker (recommended)
```bash
cd frontend
npm run dev

cd backend
docker-compose up --build
```
This will start:
- Frontend (React) on http://localhost:5173
- Backend (Node.js + WebSockets + Redis for game state storage) on http://localhost:3000
