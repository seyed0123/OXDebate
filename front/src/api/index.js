// socket.js
const socket = new WebSocket("ws://localhost:9000/ws");

socket.onopen = () => {
    console.log("WebSocket connection established");
    socket.send('Hello, server!');
};

socket.onmessage = (event) => {
    console.log("Received message:", event.data);
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

socket.onclose = () => {
    console.log("WebSocket connection closed");
};

export default socket;
