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

		Prestataire p1 = prestataireService.createPrestataire("DIOP", "May", "Restauratrice", "123", "diop@gmail.com",
				null);
		Prestataire p2 = prestataireService.createPrestataire("SOUARE", "KEBA", "Receptrice", "123",
				"keba@gmail.com", null);
		Prestataire p3 = prestataireService.createPrestataire("naruto", "boruto", "MangoMike", "123",
				"nagato@gmail.com",
				null);
		Prestataire p4 = prestataireService.createPrestataire("SOW", "Aïssatou", "Cuisinière", "456",
				"aissatou@gmail.com", null);
		Prestataire p5 = prestataireService.createPrestataire("TOURE", "Sékou", "Serveur", "789", "sekou@gmail.com",
				null);
		Prestataire p6 = prestataireService.createPrestataire("DIALLO", "Mariam", "Barmaid", "111", "mariam@gmail.com",
				null);
		Prestataire p7 = prestataireService.createPrestataire("KOUADIO", "Koffi", "Pâtissier", "222", "koffi@gmail.com",
				null);
		Prestataire p8 = prestataireService.createPrestataire("MBOW", "Oumar", "Sommelier", "333", "oumar@gmail.com",
				null);
		Prestataire p9 = prestataireService.createPrestataire("NKOSI", "Thandiwe", "Chef de cuisine", "444",
				"thandiwe@gmail.com", null);
		Prestataire p10 = prestataireService.createPrestataire("DUBE", "Sipho", "Serveuse", "555", "sipho@gmail.com",
				null);
		Prestataire p11 = prestataireService.createPrestataire("AYI", "Kwame", "Maître d'hôtel", "666",
				"kwame@gmail.com", null);

		prepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11));

		Evenement ev1 = new Evenement("Bapteme", new Date(),
				"Il s'agit de donner un nom a un bb afin de celebrer sa naissance", "Dakar", c1);

		Evenement ev2 = new Evenement("Fineraille", new Date(),
				"Il s'agit d'inhumer un corps humain afin de lui rendre à Dieu", "Yoff", c2);
		Evenement ev3 = new Evenement("Fête Religieuse", new Date(), "Célébration spirituelle et chants dédiés à Dieu",
				"Touba",
				c1);

		Evenement ev4 = new Evenement("Gamou", new Date(),
				"Il s'agit de célébrer la naissance du prophète Seydina Mouhamadou Al Hamine", "Madina Baye", c2);

		Evenement ev5 = new Evenement("Mariage", new Date(),
				"Célébration de l'union sacrée entre deux personnes", "Dakar", c2);

		Evenement ev6 = new Evenement("Conférence", new Date(),
				"Réunion de personnes pour discuter de sujets spécifiques", "Plateau", c1);

		Evenement ev7 = new Evenement("Festival de Musique", new Date(),
				"Événement musical avec divers artistes et genres de musique", "Ngor", c2);

		Evenement ev8 = new Evenement("Exposition d'Art", new Date(),
				"Présentation d'œuvres artistiques et créatives", "Ouakam", c2);

		Evenement ev9 = new Evenement("Séminaire d'Entreprise", new Date(),
				"Réunion professionnelle pour discuter de stratégies et de plans d'affaires", "Almadies", c1);

		erepository.saveAll(Arrays.asList(ev1, ev2, ev3, ev4, ev5, ev6, ev7, ev8, ev9)); // Sauvegarder les Evenements
		Demande d1 = new Demande(c2, p3, ev4);
		// Demande d2 = new Demande(c1, p1, ev1);
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
