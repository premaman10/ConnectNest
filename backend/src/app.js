import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketmanager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);

// Setup Express Port
app.set("port", process.env.PORT || 5000);

// ✅ CORS for REST APIs
app.use(cors({
  origin: ["http://localhost:3000", "https://connectnestfrontend.onrender.com"],
  credentials: true,
}));

// ✅ JSON Body Parsers
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// ✅ API Routes
app.use("/api/v1/users", userRoutes);

// ✅ Test Route
app.get("/home", (req, res) => {
  return res.json({ "hello": "world" });
});

// ✅ Socket.IO setup with CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://connectnestfrontend.onrender.com"],
    credentials: true
  }
});
connectToSocket(io);

// ✅ Connect to DB and Start Server
const start = async () => {
  try {
    const connectiondb = await mongoose.connect("mongodb+srv://amanprem374:Pawan1410@cluster0.woqntsh.mongodb.net/");
    console.log(`MongoDB connected to host: ${connectiondb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Server listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

start();
