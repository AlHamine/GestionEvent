package com.team.alpha.backGestionEvent.web;

/**
 * PrestataireChatController
 */
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.team.alpha.backGestionEvent.model.ChatMessage;

@Controller
public class PrestataireChatController {

    @MessageMapping("/prestataire-chat")
    @SendTo("/topic/prestataire-chat")
    public ChatMessage prestataireChat(ChatMessage message) {
        return message;
    }
}
