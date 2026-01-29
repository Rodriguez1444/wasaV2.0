const WebSocket = require("ws");
const url = require("url");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
    const params = url.parse(req.url, true);
    ws.roomId = params.query.room;

    ws.on("message", message => {
        const data = JSON.parse(message);
        wss.clients.forEach(client => {
            if (
                client.readyState === WebSocket.OPEN &&
                client.roomId === data.room
            ) {
                client.send(message.toString());
            }
        });
    });
});

console.log("Servidor WebSocket activo en puerto 8080");
