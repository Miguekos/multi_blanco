// src/services/socketService.js
import { io } from "socket.io-client";

// const socket = io('http://localhost:3000');
// const socket = io('https://reparalia.theapps.works');
const socket = io("https://reparalia.theapps.works", {
  transports: ["websocket"],
  upgrade: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 3,
  path: "/api/socket"
});

socket.on("connect", () => {
  console.log("Connected to socket server");
});

// socket.on('socket-id', (data) => {
//   console.log('socket-id', data);
//   socket.socketId = data.id;
// });

// socket.on('event-reload', async (data) => {
//   console.log('event-reload----->', data);
//   if (data.socketId !== socket.socketId) {
//     console.log('Recargando datos de otro cliente');
//     // Llama a la función para recargar datos
//   } else {
//     console.log('Cambio originado por este cliente, actualizacion minima');
//     // Realizar la actualización necesaria en el frontend
//   }
// });

export default socket;
