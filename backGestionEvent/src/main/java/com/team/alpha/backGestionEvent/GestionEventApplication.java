package com.team.alpha.backGestionEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Arrays;
import java.util.Date;
import com.team.alpha.backGestionEvent.model.Client;
import com.team.alpha.backGestionEvent.model.Demande;
import com.team.alpha.backGestionEvent.model.Evenement;
import com.team.alpha.backGestionEvent.model.Prestataire;
import com.team.alpha.backGestionEvent.repository.ClientRepository;
import com.team.alpha.backGestionEvent.repository.DemandeRepository;
import com.team.alpha.backGestionEvent.repository.EvenementRepository;
import com.team.alpha.backGestionEvent.repository.PrestataireRepository;
import com.team.alpha.backGestionEvent.service.ClientService;
import com.team.alpha.backGestionEvent.service.PrestataireService;
import com.team.alpha.backGestionEvent.web.EmailController;

@SpringBootApplication
public class GestionEventApplication implements CommandLineRunner {

	// private static final Logger logger =

	// LoggerFactory.getLogger(GestionEventApplication.class);
	@Autowired
	ClientService clientService;
	@Autowired
	PrestataireService prestataireService;

	@Autowired
	private EmailController emailController;
	@Autowired
	private EvenementRepository erepository;

	@Autowired
	private ClientRepository crepository;

	@Autowired
	private PrestataireRepository prepository;

	@Autowired
	DemandeRepository dRepository;

	public static void main(String[] args) {
		SpringApplication.run(GestionEventApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Client c1 = clientService.createClient("NDIAYE", "Al Hamine", "oriontheroot@gmail.com", null, "123");
		Client c2 = clientService.createClient("NDIAYE", "Mouhamadou", "smah.n@univ.zig.sn", null, "123");
		crepository.saveAll(Arrays.asList(c1, c2));

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8e0880c (Backend updated)
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
		Prestataire p1 = prestataireService.createPrestataire("DIOP", "May", "Restauratrice", "123", "diop@gmail.com",
				null);
		Prestataire p2 = prestataireService.createPrestataire("SOUARE", "KEBA", "Receptrice", "123",
				"keba@gmail.com", null);
		Prestataire p3 = prestataireService.createPrestataire("naruto", "boruto", "MangoMike", "123",
				"nagato@gmail.com",
				null);
		prepository.saveAll(Arrays.asList(p1, p2, p3));
<<<<<<< HEAD
<<<<<<< HEAD
=======
	// 	Prestataire p1 = prestataireService.createPrestataire("DIOP", "May", "Restauratrice", "123", "diop@gmail.com",
	// 			null);
	// 	Prestataire p2 = prestataireService.createPrestataire("SOUARE", "KEBA", "Receptrice", "123",
	// 			"keba@gmail.com", null);
	// 	Prestataire p3 = prestataireService.createPrestataire("naruto", "boruto", "MangoMike", "123",
	// 			"nagato@gmail.com",
	// 			null);
	// 	prepository.saveAll(Arrays.asList(p1, p2, p3));
>>>>>>> cfe2644 (Update Logout et Login maintien des user , create event)
=======
>>>>>>> 8e0880c (Backend updated)
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)

		Evenement ev1 = new Evenement("Bapteme", new Date(),
				"Il s'agit de donner un nom a un bb afin de celebrer sa naissance", "Dakar", c1);

		Evenement ev2 = new Evenement("Fineraille", new Date(),
				"Il s'agit d'inhumer un corps humain afin de lui rendre à Dieu", "Yoff", c2);
		Evenement ev3 = new Evenement("Thiante", new Date(), "Il s'agit de donner de dire louage à Dieu", "Madina Baye",
				c1);
		Evenement ev4 = new Evenement("Gamou", new Date(),
				"Il s'agit de célébrer la naissance du prophète Seydina Mouhamadou Al Hamine", "Madina Baye", c2);

		erepository.saveAll(Arrays.asList(ev1, ev2, ev3, ev4)); // Sauvegarder les Evenements
		Demande d1 = new Demande(c2, p3, ev4);
		Demande d2 = new Demande(c1, p1, ev1);
		dRepository.saveAll(Arrays.asList(d1, d2));
		// Envoyer l-email

		// emailController.sendReponse("abdourahamanetinkindjeeri99@gmail.com",
		// "atinkindjeeri999@gmail.com",
		// "Réponse a votre demande de prestatation",
		// "Bonjour .\n J e vous remercie pour votre demande. \n Votre événement sera
		// assuré par un service de qualite.\n Cordialement,Monsieur|Madame.");
	}

}
