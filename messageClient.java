var stompClient = Stomp.over(new SockJS('/websocket-endpoint'));

stompClient.connect({}, function (frame) {
    stompClient.subscribe('/topic/client-chat', function (message) {
        var messageText = JSON.parse(message.body).content;
        // Gérez le message reçu ici (côté client)
    });
});

function sendClientMessage(message) {
    stompClient.send("/app/client-chat", {}, JSON.stringify({ 'content': message }));
}
