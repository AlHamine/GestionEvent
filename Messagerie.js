var stompClient = Stomp.over(new SockJS("/websocket-endpoint"));

stompClient.connect({}, function (frame) {
  stompClient.subscribe("/topic/chat", function (message) {
    var messageText = JSON.parse(message.body).content;
    // Gérez le message reçu ici
  });
});

function sendMessage(message) {
  stompClient.send("/app/chat", {}, JSON.stringify({ content: message }));
}
