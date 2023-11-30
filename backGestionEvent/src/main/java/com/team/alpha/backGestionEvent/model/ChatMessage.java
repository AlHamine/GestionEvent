package com.team.alpha.backGestionEvent.model;

import java.util.Date;

public class ChatMessage {
    private String content;
    private String to;
    private Date timestamp;

    public ChatMessage() {
        // Constructeur par défaut requis pour la désérialisation JSON
    }

    public ChatMessage(String content, String sender,Date timestamp) {
        this.content = content;
        this.to = sender;
        this.timestamp = new Date();

    }

    // Getters et setters

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

   

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

   
}
