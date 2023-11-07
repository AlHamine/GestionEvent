package com.team.alpha.backGestionEvent.web;

/**
 * ClientChatController
 */
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.team.alpha.backGestionEvent.model.ChatMessage;

@Controller
public class ClientChatController {

    @MessageMapping("/client-chat")
    @SendTo("/topic/client-chat")
    public ChatMessage clientChat(ChatMessage message) {
        return message;
    }
}
