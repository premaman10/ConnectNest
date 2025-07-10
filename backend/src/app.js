import express from "express";
import { createServer } from "node:http";//it connect express server with socket server

import { Server } from "socket.io";
import {mongoose} from "mongoose";

import cors from "cors";

import {connectToSocket} from "./controllers/socketmanager.js"

import userRoutes from "./routes/users.routes.js";


const app = express();

const server = createServer(app);

const io = connectToSocket(server);

app.set("port",(process.env.PORT || 5000))
app.use(cors({
    origin: ["http://localhost:3000", "https://connectnestfrontend.onrender.com"],
    credentials: true
}));
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userRoutes);

app.get("/home",(req,res)=>{
    return res.json({"hello":"world"})
});


const start = async()=>{
    try {
        const connectiondb = await mongoose.connect("mongodb+srv://amanprem374:Pawan1410@cluster0.woqntsh.mongodb.net/")
        console.log(`mongodb connected to db host ${connectiondb.connection.host}`);
        server.listen(app.get("port"),()=>{
            console.log(`listening on port 5000`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}
start();