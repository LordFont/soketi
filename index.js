import { WebSocketServer } from "ws";

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