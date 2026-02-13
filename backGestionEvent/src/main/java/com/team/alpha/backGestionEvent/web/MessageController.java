package com.team.alpha.backGestionEvent.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;
import com.team.alpha.backGestionEvent.model.Message;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.service.MessageService;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService mService;

    @Autowired
    private PrestataireRepository pRepository;
    @Autowired
    private ClientRepository cRepository;

    @GetMapping("/{mail}")
    public List<Message> getClientByMail(@PathVariable String mail) {
        return mService.getMessagesBySourceMail(mail);
    }

    @PostMapping("/{mail}")
    public Message envoyerMessage(@RequestBody Message m, @PathVariable String mail) throws Exception {

        if (pRepository.findByMail(mail).isPresent() || cRepository.findByMail(mail).isPresent()) {
            m.setTimestamp(new Date());
            return mService.Sauvegarder(m);
        }

        return null;
    }

    @GetMapping("/{source}/{dest}")
    public List<Message> dialogue(@PathVariable String source, @PathVariable String dest) {
        if (pRepository.findByMail(dest).isPresent() || cRepository.findByMail(dest).isPresent()) {
            return mService.dialogue(source, dest);
        }
        return null;
    }

}
