import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

interface ExtendedServer extends HTTPServer {
  io?: SocketIOServer;
}

interface ExtendedSocket extends NetSocket {
  server: ExtendedServer;
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for WebSocket requests
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    res.status(500).json({ message: "Socket not available" });
    return;
  }

  const socket = res.socket as ExtendedSocket;

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!socket.server.io) {
    console.log("Initializing Socket.IO server...");

    const io = new SocketIOServer(socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*", // Restrict in production
        methods: ["GET", "POST"],
      },
    });

    socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("join-group", (groupId: string) => {
        console.log(`User ${socket.id} joined group: ${groupId}`);
        socket.join(groupId);
      });

      socket.on("send-message", (data) => {
        const { groupId, message, name, time, avatar } = data;
        console.log(`Message from ${name} to group ${groupId}: ${message}`);
        io.to(groupId).emit("receive-message", {
          message,
          name,
          groupId,
          time,
          avatar,
        });
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.IO server already initialized.");
  }

  res.end(); // Return a response to prevent hanging
}
