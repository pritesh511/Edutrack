import type { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

interface ExtendedServer extends HTTPServer {
  io?: SocketIOServer;
}

interface ExtendedSocket extends NetSocket {
  server: ExtendedServer;
}

interface ExtendedNextApiResponse extends NextApiResponse {
  socket: ExtendedSocket;
}

const SocketHandler = (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server...");

    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*", // Restrict to your domain in production
        methods: ["GET", "POST"],
      },
    });

    // Attach the Socket.IO server to the HTTP server
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      //   socket.emit("join-group", (slug: string) => {
      //     console.log(`User ${socket.id} joined group: ${slug}`);
      //     socket.join(slug);
      //   });

      //   socket.on(
      //     "send-message",
      //     (data: { groupId: string; message: string; senderId: string }) => {
      //       const { groupId, message, senderId } = data;
      //       console.log(
      //         `Message from ${senderId} to group ${groupId}: ${message}`
      //       );
      //       io.to(groupId).emit("receive-message", {
      //         message,
      //         senderId,
      //         groupId,
      //       });
      //     }
      //   );

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.IO server already initialized.");
  }

  res.end();
};

export default SocketHandler;
