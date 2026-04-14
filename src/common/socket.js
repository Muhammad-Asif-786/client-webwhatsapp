import { io } from "socket.io-client";

const SOCKET_PORT = import.meta.env.VITE_SOCKET_PORT || 3045;

const socket = io(`http://localhost:${SOCKET_PORT}`, {
  transports: ["websocket"],
  path: "/socket.io",
});

export default socket;

