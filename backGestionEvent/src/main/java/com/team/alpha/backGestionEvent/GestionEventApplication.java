package com.team.alpha.backGestionEvent;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import com.team.alpha.backGestionEvent.repository.EvenementRepository;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.repository.UserRepository;
import com.team.alpha.backGestionEvent.service.ClientService;
import com.team.alpha.backGestionEvent.service.PrestataireService;

@SpringBootApplication
public class GestionEventApplication implements CommandLineRunner {

	// private static final Logger logger =

	// LoggerFactory.getLogger(GestionEventApplication.class);
	@Autowired
	ClientService clientService;
	@Autowired
	PrestataireService prestataireService;

	@Autowired
	private UserRepository urepository;

	@Autowired
	private EvenementRepository erepository;

	@Autowired
	private ClientRepository crepository;

	@Autowired
	private PrestataireRepository prepository;

	public static void main(String[] args) {
		SpringApplication.run(GestionEventApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Client c1 = clientService.createClient("NDIAYE", "Al Hamine", "oriontheroot@gmail.com", null, "123");
		Client c2 = clientService.createClient("NDIAYE", "Mouhamadou", "smah.n@univ.zig.sn", null, "123");
		crepository.saveAll(Arrays.asList(c1, c2));

		Prestataire p1 = prestataireService.createPrestataire("DIOP", "May", "Restauratrice", "123", "diop@gmail.com",
				null);
		Prestataire p2 = prestataireService.createPrestataire("SOUARE", "KEBA", "Receptrice", "123",
				"keba@gmail.com", null);
		Prestataire p3 = prestataireService.createPrestataire("naruto", "boruto", "MangoMike", "123",
				"nagato@gmail.com",
				null);
		prepository.saveAll(Arrays.asList(p1, p2, p3));

		Evenement ev1 = new Evenement("Bapteme", new Date(),
				"Il s'agit de donner un nom a un bb afin de celebrer sa naissance", "Dakar", c1);

		Evenement ev2 = new Evenement("Fineraille", new Date(),
				"Il s'agit d'inhumer un corps humain afin de lui rendre à Dieu", "Yoff", c2);
		Evenement ev3 = new Evenement("Thiante", new Date(), "Il s'agit de donner de dire louage à Dieu", "Madina Baye",
				c1);
		Evenement ev4 = new Evenement("Gamou", new Date(),
				"Il s'agit de célébrer la naissance du prophète Seydina Mouhamadou Al Hamine", "Madina Baye", c2);

		// ev1.ajouterPrestataire(p2); // Ajouter le Prestataire p2 à l'Evenement ev1
		erepository.saveAll(Arrays.asList(ev1, ev2, ev3, ev4)); // Sauvegarder les Evenements

	}
}