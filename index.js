import { WebSocketServer } from "ws";
import { createServer } from "http";

// Use port number from the PORT environment variable or 3000 if not specified
const port = process.env.PORT || 3000;

const server = createServer({ port: port });

server.listen(port);

const wss = new WebSocketServer({ port: 8080, clientTracking: true });

wss.on("connection", (ws) => {
    console.log("Client connected");
    console.log(JSON.stringify(ws));

    ws.onerror = (error) => {
        console.error(error);
    };

    ws.onmessage = (data) => {
        console.log('received: %s', data);

        const receivedData = JSON.parse(data.data.toString());

        console.log('parsed data: ', receivedData);


        ws.send('Response')
    }

    ws.onclose = (closeEvent) => {
        console.log("Connection closed: ");
        console.log(JSON.stringify(closeEvent));
    }
});

export default wss;