import { Server } from "socket.io";
let io;

export const ioInit = (httpServer) => {
  const ioInstance = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  io = ioInstance;
  return ioInstance;
};

export const getIO = () => {
  if (!io) throw new Error("Socket IO is not intialized!");
  return io;
};
