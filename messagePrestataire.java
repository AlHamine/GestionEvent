var stompClient = Stomp.over(new SockJS('/websocket-endpoint'));

stompClient.connect({}, function (frame) {
    stompClient.subscribe('/topic/prestataire-chat', function (message) {
        var messageText = JSON.parse(message.body).content;
        // Gérez le message reçu ici (côté prestataire)
    });
});

function sendPrestataireMessage(message) {
    stompClient.send("/app/prestataire-chat", {}, JSON.stringify({ 'content': message }));
}
