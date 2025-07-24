import { Server, Socket } from "socket.io"



let connections = {}

let messages = {}

let timeOnline  = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", "https://connectnestfrontend.onrender.com"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    let connections = {};
    let messages = {};
    let timeOnline = {};

    io.on("connection", (socket) => {
        socket.on("join-call", (room) => {
            if (!connections[room]) connections[room] = [];
            connections[room].push(socket.id);
            timeOnline[socket.id] = new Date();

            connections[room].forEach(id => {
                io.to(id).emit("user-joined", socket.id, connections[room]);
            });

            if (messages[room]) {
                messages[room].forEach(msg => {
                    io.to(socket.id).emit("chat-message", msg.data, msg.sender, msg["socket-id-sender"]);
                });
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            const [room, found] = Object.entries(connections).find(([_, users]) => users.includes(socket.id)) || ["", false];
            if (found) {
                if (!messages[room]) messages[room] = [];
                messages[room].push({ data, sender, "socket-id-sender": socket.id });
                connections[room].forEach(id => {
                    io.to(id).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            let roomFound = null;

            for (const [room, users] of Object.entries(connections)) {
                const index = users.indexOf(socket.id);
                if (index !== -1) {
                    roomFound = room;
                    users.splice(index, 1);
                    connections[room] = users;
                    connections[room].forEach(id => {
                        io.to(id).emit("user-left", socket.id);
                    });

                    if (connections[room].length === 0) {
                        delete connections[room];
                        delete messages[room];
                    }
                    break;
                }
            }

            delete timeOnline[socket.id];
        });
    });

    return io;
};
// export default connectToSocket;