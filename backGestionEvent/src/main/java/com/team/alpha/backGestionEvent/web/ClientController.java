package com.team.alpha.backGestionEvent.web;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.FileData;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.FileDataRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;
import com.team.alpha.backGestionEvent.service.ClientService;

//Pour les controller 
@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileDataRepository fileDataRepository;

    private final String FOLDER_PATH = System.getProperty("user.dir") + "/src/assets/";

    @GetMapping("/mail")
    public Client getClientByMail(@RequestParam String mail) {
        return clientService.getClientByMail(mail).get();
    }

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public Client createClient(@RequestBody Client c) throws Exception {
        User user = new User(c.getMail(), passwordEncoder.encode(c.getPassword()), c.getPhoto(), "client");
        userRepository.save(user);
        return clientService.createClient(c);
    }

    @PostMapping("/clientphoto")
    @CrossOrigin(origins = "*", methods = { RequestMethod.POST,
            RequestMethod.GET, RequestMethod.OPTIONS })
    public Client createClient(@RequestParam("file") MultipartFile file,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom, @RequestParam("mail") String mail,
            @RequestParam("password") String password) throws Exception {

        String filePath = FOLDER_PATH + file.getOriginalFilename();

        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());

        file.transferTo(new File(filePath));
        User user = new User();
        user.setPhoto(file.getOriginalFilename());
        user.setMail(mail);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("client");
        user.setPhoto(file.getOriginalFilename());
        userRepository.save(user);
        return clientService.createClient(file, nom, prenom, mail, password);
    }

    // Recuperation de l'image par l'end-point pour son exploitation cote front-end
    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
        byte[] imageData = clientService.downloadImageFromFileSystem(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        return clientService.updateClient(id, updatedClient);
    }

    // Controller permettant la modification du client et de televerser la photo
    // dans le dossier de stockage des images
    @PutMapping("/update")
    @CrossOrigin(origins = "*", methods = { RequestMethod.POST,
            RequestMethod.GET, RequestMethod.OPTIONS })
    public Client updateClient(@RequestParam("file") MultipartFile file,
            @RequestParam("nom") String nom, @RequestParam("mail") String mail,
            @RequestParam("prenom") String prenom,
            @RequestParam("password") String password) throws Exception {

        String filePath = FOLDER_PATH + file.getOriginalFilename();

        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());
        file.transferTo(new File(filePath));

        return clientService.updateClient(file, nom, prenom, mail, password);
    }

    @DeleteMapping("/{id}")
    public boolean deleteClient(@PathVariable Long id) {
        return clientService.deleteClient(id);
    }

    @GetMapping("/profile")
    public ResponseEntity<Client> getClientProfile(@AuthenticationPrincipal User user) {
        // Utilisez l'utilisateur actuellement connecté pour récupérer le profil du
        // client
        Optional<Client> client = clientService.getClientByMail(user.getMail());
        return new ResponseEntity<>(client.get(), HttpStatus.OK);
    }

    // Ajoutez d'autres méthodes pour les fonctionnalités spécifiques aux clients
}
