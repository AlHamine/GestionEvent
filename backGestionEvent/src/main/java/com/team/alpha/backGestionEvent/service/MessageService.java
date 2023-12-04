package com.team.alpha.backGestionEvent.service;

import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.alpha.backGestionEvent.model.Message;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.MessageRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;

@Service
public class MessageService {

    private final MessageRepository mRepository;


    public MessageService(MessageRepository userRepository) {
        this.mRepository = userRepository;
    }

    public Message Sauvegarder(Message m) {
       return mRepository.save(m);
    }

    public Iterable<Message> getAllUsers() {
        return mRepository.findAll();
    }
    public List<Message> getMessagesBySourceMail(String s) {
        return mRepository.mesMessage(s);
    }
    public List<Message> dialogue(String s,String d) {
        return mRepository.dialogue(s, d);
    }

    // public Message findByUsername(String username) {
    //     return mRepository.findByMail1(username).get();
    // }
}