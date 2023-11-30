package com.team.alpha.backGestionEvent.web;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.team.alpha.backGestionEvent.model.ChatMessage;

@Controller
public class ChatController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/application")
    @SendTo("/all/messages")

    public ChatMessage sendMessage(final ChatMessage message) {
        // Traitez le message ici et renvoyez-le aux abonnés du sujet
        message.setTimestamp(new Date());
        return message;
    }

    @MessageMapping("/private")
    public void sendMessageToUserSpecfic(@Payload ChatMessage message) {
        // Traitez le message ici et renvoyez-le aux abonnés du sujet
         message.setTimestamp(new Date());
         simpMessagingTemplate.convertAndSendToUser(message.getTo(), "/specific",message);
    }
}
