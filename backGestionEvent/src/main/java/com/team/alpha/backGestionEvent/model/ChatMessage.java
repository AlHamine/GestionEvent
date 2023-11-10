package com.team.alpha.backGestionEvent.model;

import java.util.Date;
public class ChatMessage {
    private String content;
    private String sender;
    private Date timestamp;

    public ChatMessage() {
        // Constructeur par défaut requis pour la désérialisation JSON
    }

    public ChatMessage(String content, String sender,Date timestamp) {
        this.content = content;
        this.sender = sender;
        this.timestamp=timestamp;
        
    }

    // Getters et setters

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
