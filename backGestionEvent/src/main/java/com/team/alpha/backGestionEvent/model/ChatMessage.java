package com.team.alpha.backGestionEvent.model;

public class ChatMessage {
    private String content;
    private String sender;

    public ChatMessage() {
        // Constructeur par défaut requis pour la désérialisation JSON
    }

    public ChatMessage(String content, String sender) {
        this.content = content;
        this.sender = sender;
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
}
