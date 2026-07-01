import { io } from "socket.io-client";

// Same base as api.js, minus the /api suffix
const SOCKET_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace(
  "/api",
  ""
);

const socket = io(SOCKET_URL, {
  autoConnect: false, // we connect manually once we know who the user is
  withCredentials: true,
});

export default socket;