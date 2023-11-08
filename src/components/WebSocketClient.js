// class WebSocketClient {
//   constructor() {
//     this.websocket = new WebSocket("ws://localhost:80"); // Remplacez par l'URL WebSocket de votre serveur
//     this.messageListeners = [];

//     this.websocket.onopen = () => {
//       console.log("WebSocket connection opened.");
//     };

//     this.websocket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       this.messageListeners.forEach((listener) => {
//         listener(message);
//       });
//     };

//     this.websocket.onclose = () => {
//       console.log("WebSocket connection closed.");
//     };
//   }

//   onMessage(listener) {
//     this.messageListeners.push(listener);
//   }

//   send(message) {
//     this.websocket.send(JSON.stringify(message));
//   }

//   close() {
//     this.websocket.close();
//   }
// }

// export default WebSocketClient;
