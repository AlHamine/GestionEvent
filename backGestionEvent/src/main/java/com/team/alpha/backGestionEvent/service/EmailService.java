package com.team.alpha.backGestionEvent.service;

//import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.team.alpha.backGestionEvent.model.Email;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
// @Repository
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendMail(Email email) {
        // Properties properties = new Properties();

        // properties.put("spring.mail.host", "smtp.gmail.com");
        // properties.put("spring.mail.port", "587");
        // properties.put("spring.mail.properties.mail.smtp.auth", "true");
        // properties.put("spring.mail.properties.mail.smtp.starttls.enable", "true");

        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setFrom(email.getEmailPrestataire());
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(email.getEmailClient()));
            message.setSubject(email.getObjet());
            message.setText(email.getMessage());

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
