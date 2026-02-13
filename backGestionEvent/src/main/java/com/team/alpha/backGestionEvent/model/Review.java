package com.team.alpha.backGestionEvent.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer note;
    private String emailPrestataire;
    private String emailClient;
    private String comment;

    public Review() {
    }

    public Review(Integer note, String emailPrestataire, String emailClient, String comment) {
        this.note = note;
        this.emailPrestataire = emailPrestataire;
        this.emailClient = emailClient;
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public String getEmailPrestataire() {
        return emailPrestataire;
    }

    public void setEmailPrestataire(String emailPrestataire) {
        this.emailPrestataire = emailPrestataire;
    }

    public String getEmailClient() {
        return emailClient;
    }

    public void setEmailClient(String emailClient) {
        this.emailClient = emailClient;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
