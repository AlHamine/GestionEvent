package com.team.alpha.backGestionEvent.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Date;
/**
 * Client
 */

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idm;
    private String source;
    private String dest;
    private String message;
    private Date timestamp;

    public Message() {
        super();
    }

  
    public Message(String source, String dest, String message) {
        this.source = source;
        this.dest = dest;
        this.message = message;
        this.timestamp = new Date();
    }


    public long getIdm() {
        return idm;
    }

    public void setIdm(long idm) {
        this.idm = idm;
    }
    

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }


    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }
    
    


}