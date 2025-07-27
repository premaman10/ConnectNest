
# 📞 ConnectNest

**ConnectNest** is a Zoom-like real-time communication web application built using the MERN stack. It allows users to conduct secure video calls, chat in real time, share their screens, and collaborate from anywhere in the world. The application is powered by WebRTC for peer-to-peer media streaming and Socket.IO for real-time event handling.

> 🔗 **Live Demo**: [connectnestfrontend.onrender.com](https://connectnestfrontend.onrender.com)  
> 🖥️ **Frontend Repo**: [Frontend GitHub Link](https://github.com/premaman10/ConnectNest-Frontend)  
> 🧠 **Backend Repo**: [Backend GitHub Link](https://github.com/premaman10/ConnectNest-Backend)

---

## 🚀 Features

- ✅ Secure User Authentication using JWT
- 💬 Real-time Chat Messaging
- 📹 Peer-to-peer HD Video Calling via WebRTC
- 🖥️ Screen Sharing Support
- 📡 Real-time Signaling with Socket.IO
- 🌐 MongoDB Integration for storing user data
- 🚀 Hosted on Render (both frontend and backend)

---

## 🛠️ Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Real-time Communication**: Socket.IO, WebRTC
- **Dev Tools**: Nodemon, JWT, Render Hosting

---

## 🧩 Project Structure

```

ConnectNest/
├── connectnest-frontend/         # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── connectnest-backend/          # Node.js + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js

````

---

## 🧪 Getting Started

### Frontend Setup

```bash
git clone https://github.com/premaman10/ConnectNest-Frontend
cd ConnectNest-Frontend
npm install
npm start
````

### Backend Setup

```bash
git clone https://github.com/premaman10/ConnectNest-Backend
cd ConnectNest-Backend
npm install
npm run dev
```

Make sure the backend is running on the correct port and the frontend `.env` file (if any) points to the correct backend URL.

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 💡 How It Works

ConnectNest follows a full-stack architecture with separated frontend and backend services. Upon user login or signup, the backend issues a JWT token for secure authentication. Once authenticated, users can initiate or join a video call session. The signaling process is managed via Socket.IO, while media streams (video/audio/screen) are handled by WebRTC for a low-latency peer-to-peer connection. Users can also exchange real-time chat messages during a call session.

---

## 📦 Deployment

The entire application is deployed on Render:

* **Frontend**: [connectnestfrontend.onrender.com](https://connectnestfrontend.onrender.com)
* **Backend**: Hosted on Render (linked to frontend through API)

---

## 🤝 Contributing

We welcome contributions to enhance ConnectNest.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m 'Add feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it with attribution.

---

## 🙌 Acknowledgements

* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Socket.IO](https://socket.io/)
* [WebRTC](https://webrtc.org/)
* [Render](https://render.com/)

```

---

Let me know if you want this in a downloadable `.md` file or pushed to your GitHub repo directly. Also feel free to send the frontend/backend repo links if you'd like them inserted in place of the placeholders.
```
