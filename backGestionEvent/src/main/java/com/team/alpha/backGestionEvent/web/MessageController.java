package com.team.alpha.backGestionEvent.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Message;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.UserRepository;
import com.team.alpha.backGestionEvent.service.MessageService;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService mService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/mail")
    public List<Message> getClientByMail(@RequestParam String mail) {
        return mService.getMessagesBySourceMail(mail);
    }
    @PostMapping("/mail")
    public Message createClient(@RequestBody Message m,@RequestParam String mail) throws Exception {
         User existe = userRepository.findByMail(mail).get();
        if (existe != null) {
            return mService.Sauvegarder(m);
        }

        return null;
    }

    @GetMapping("/source/dest")
    public List<Message> dialogue(@RequestParam String source, @RequestParam String dest) {
        User existe = userRepository.findByMail(dest).get();
        if (existe != null) {
            return mService.dialogue(source, dest);
        }
        return null;
    }

}
