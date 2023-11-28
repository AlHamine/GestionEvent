package com.team.alpha.backGestionEvent.security;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.team.alpha.backGestionEvent.service.UserDetailsServiceImpl;
import com.team.alpha.backGestionEvent.security.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPoint exceptionHandler;

	@Autowired
	private AuthenticationFilter authenticationFilter;

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	// http.csrf().disable().cors().and()
	// .authorizeHttpRequests().anyRequest().permitAll();
	// return
	// .csrf(csrf -> csrf.disable())
	// .cors(withDefaults())
	// .sessionManagement(management -> management
	// .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	// .authorizeRequests(authorizeRequests -> authorizeRequests
	// .requestMatchers(HttpMethod.POST, "/login").permitAll()
	// .requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
	// .requestMatchers(HttpMethod.POST, "/clients").permitAll()
	// .anyRequest().authenticated())
	// .exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
	// .addFilterBefore(authenticationFilter,
	// UsernamePasswordAuthenticationFilter.class)
	// .httpBasic(withDefaults())
	// http.build();

	@Bean
	SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
<<<<<<< HEAD
		http.csrf().disable().cors().and()
				.authorizeHttpRequests().anyRequest().permitAll();
		return http
<<<<<<< HEAD
				.csrf(csrf -> csrf.disable())
				.cors(withDefaults())
				.sessionManagement(management -> management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorizeRequests -> authorizeRequests
						.requestMatchers(HttpMethod.POST, "/login").permitAll()
						.requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
						.requestMatchers(HttpMethod.POST, "/client").permitAll()
=======

	// @Bean
	// SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
	// return http
	// .csrf(csrf -> csrf.disable())
	// .cors(withDefaults())
	// .sessionManagement(management -> management
	// .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	// .authorizeRequests(authorizeRequests -> authorizeRequests
	// .requestMatchers(HttpMethod.POST, "/login").permitAll()
	// .anyRequest().authenticated())
	// .exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
	// .addFilterBefore(authenticationFilter,
	// UsernamePasswordAuthenticationFilter.class)
	// .httpBasic(withDefaults())
	// .build();
	// }

	// A decommenter une fois qu'on lance la partie front
=======
>>>>>>> 8e0880c (Backend updated)
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
	@Bean
	SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
<<<<<<< HEAD
		return http
				.csrf(csrf -> csrf.disable())
				.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas encommentaire
				.sessionManagement(management -> management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorizeRequests -> authorizeRequests
<<<<<<< HEAD
<<<<<<< HEAD
						.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*").permitAll()
						.requestMatchers(HttpMethod.POST, "/event").permitAll()
>>>>>>> cfe2644 (Update Logout et Login maintien des user , create event)
=======
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
						.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*", "/event",
								"/websocket/*")
						.permitAll()
						.requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
						.requestMatchers(HttpMethod.POST, "/clients").permitAll()
<<<<<<< HEAD
>>>>>>> 8e0880c (Backend updated)
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
						.anyRequest().authenticated())
				.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
				.addFilterBefore(authenticationFilter,
						UsernamePasswordAuthenticationFilter.class)
				.httpBasic(withDefaults())
<<<<<<< HEAD
=======
				// .csrf(csrf -> csrf.disable())
				// .cors(withDefaults())
				// .sessionManagement(management -> management
				// .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				// .authorizeRequests(authorizeRequests -> authorizeRequests
				// .requestMatchers(HttpMethod.POST, "/login").permitAll()
				// .requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
				// .requestMatchers(HttpMethod.POST, "/client").permitAll()
				// .anyRequest().authenticated())
				// .exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
				// .addFilterBefore(authenticationFilter,
				// UsernamePasswordAuthenticationFilter.class)
				// .httpBasic(withDefaults())
>>>>>>> 4e71276 (Mettre a niveau mon repertoire avant le prochain pull)
				.build();
	}

=======

=======
				.build();
	}

>>>>>>> 27aa8ab (Revision du projet dans le github)
	// Moins de security
=======
>>>>>>> 2fd3c3a (updating users->client et user->prestataires)
	// @Bean
	// SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
	// 	return http
	// 			.csrf(csrf -> csrf.disable())
	// 			.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas encommentaire
	// 			.sessionManagement(management -> management
	// 					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	// 			.authorizeRequests(authorizeRequests -> authorizeRequests
	// 					.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*", "/event",
	// 							"/websocket/*")
	// 					.permitAll()
	// 					.requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
	// 					.requestMatchers(HttpMethod.POST, "/clients").permitAll()
	// 					.anyRequest().authenticated())
	// 			.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
	// 			.addFilterBefore(authenticationFilter,
	// 					UsernamePasswordAuthenticationFilter.class)
	// 			.httpBasic(withDefaults())
	// 			.build();
	// }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	// @Bean
	// CorsConfigurationSource corsConfigurationSource() {
	// 	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	// 	CorsConfiguration config = new CorsConfiguration();
	// 	config.setAllowedOrigins(Arrays.asList("*"));
	// 	config.setAllowedMethods(Arrays.asList("*"));
	// 	config.setAllowedHeaders(Arrays.asList("*"));
	// 	config.setAllowCredentials(false);
	// 	config.applyPermitDefaultValues();

	// 	source.registerCorsConfiguration("/**", config);
	// 	return source;
	// }

	
	
>>>>>>> cfe2644 (Update Logout et Login maintien des user , create event)
=======
>>>>>>> 8e0880c (Backend updated)
=======
>>>>>>> 27aa8ab (Revision du projet dans le github)
=======
	// Moins de security
=======
>>>>>>> 310dff7 (Ajout du rapport)
	@Bean
	SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
		return http
				.csrf(csrf -> csrf.disable())
				.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas encommentaire
=======
		return http
				.csrf(csrf -> csrf.disable())
				.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas en commentaire
>>>>>>> 40865c7 (Mise a jout de UI pour le prestataire)
				.sessionManagement(management -> management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorizeRequests -> authorizeRequests
						.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*",
								"/event",
								"/websocket/*")
						.permitAll()
<<<<<<< HEAD
						.requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
						.requestMatchers(HttpMethod.POST, "/clients").permitAll()
=======
						.requestMatchers(HttpMethod.POST,
								"/prestataires", "prestataires/prestatairephoto")
						.permitAll()
						.requestMatchers(HttpMethod.POST,
								"/client", "/client/clientphoto")
						.permitAll()
>>>>>>> 40865c7 (Mise a jout de UI pour le prestataire)
						.anyRequest().authenticated())
				.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
				.addFilterBefore(authenticationFilter,
						UsernamePasswordAuthenticationFilter.class)
				.httpBasic(withDefaults())
				.build();
<<<<<<< HEAD
=======
	return http
	.csrf(csrf -> csrf.disable())
	.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas en commentaire
	.sessionManagement(management -> management
	.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	.authorizeRequests(authorizeRequests -> authorizeRequests
	.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*",
	"/event",
	"/websocket/*")
	.permitAll()
	.requestMatchers(HttpMethod.POST, "/prestataires","prestataires/prestatairephoto").permitAll()
	.requestMatchers(HttpMethod.POST, "/client","/client/clientphoto").permitAll()
	.anyRequest().authenticated())
	.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
	.addFilterBefore(authenticationFilter,
	UsernamePasswordAuthenticationFilter.class)
	.httpBasic(withDefaults())
	.build();
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======
>>>>>>> 40865c7 (Mise a jout de UI pour le prestataire)
	}

<<<<<<< HEAD
>>>>>>> 2fd3c3a (updating users->client et user->prestataires)
=======
	// Moins de security
=======
>>>>>>> 7e33b82 (Mise a jour majeur->ameliorer la coherence)
	// @Bean
	// SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
<<<<<<< HEAD
<<<<<<< HEAD
	// 	return http
	// 			.csrf(csrf -> csrf.disable())
	// 			.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas encommentaire
	// 			.sessionManagement(management -> management
	// 					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	// 			.authorizeRequests(authorizeRequests -> authorizeRequests
	// 					.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*",
	// 							"/event",
	// 							"/websocket/*")
	// 					.permitAll()
	// 					.requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
	// 					.requestMatchers(HttpMethod.POST, "/clients").permitAll()
	// 					.anyRequest().authenticated())
	// 			.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
	// 			.addFilterBefore(authenticationFilter,
	// 					UsernamePasswordAuthenticationFilter.class)
	// 			.httpBasic(withDefaults())
	// 			.build();
=======
	// 	// Add this row
	// 	http.csrf().disable().cors().and()
	// 			.authorizeHttpRequests().anyRequest().permitAll();
	// 	return http.build();
>>>>>>> d21b587 (Redefinir les entites pour gerer l'insertions des photos de profils.)
=======
	// // Add this row
	// http.csrf().disable().cors().and()
	// .authorizeHttpRequests().anyRequest().permitAll();
	// return http.build();
>>>>>>> 40865c7 (Mise a jout de UI pour le prestataire)
	// }

<<<<<<< HEAD
>>>>>>> 310dff7 (Ajout du rapport)
=======
	// Moins de security
=======
>>>>>>> d72ab0d (Mise a jour=>Gestion des Demandes de prestations)
	@Bean
	SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
		return http
				.csrf(csrf -> csrf.disable())
				.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas encommentaire
				.sessionManagement(management -> management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorizeRequests -> authorizeRequests
						.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/*",
								"/event",
								"/websocket/*")
						.permitAll()
						.requestMatchers(HttpMethod.POST, "/prestataires").permitAll()
						.requestMatchers(HttpMethod.POST, "/clients").permitAll()
						.anyRequest().authenticated())
				.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
				.addFilterBefore(authenticationFilter,
						UsernamePasswordAuthenticationFilter.class)
				.httpBasic(withDefaults())
				.build();
	}

<<<<<<< HEAD
>>>>>>> 7e33b82 (Mise a jour majeur->ameliorer la coherence)
=======
	// Moins de security
	// @Bean
	// SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
	// // Add this row
	// http.csrf().disable().cors().and()
	// .authorizeHttpRequests().anyRequest().permitAll();
	// return http.build();
	// }

>>>>>>> d72ab0d (Mise a jour=>Gestion des Demandes de prestations)
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("http://localhost:3000"); // L'origine de votre application frontend
		configuration.addAllowedMethod("*");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
	
	
	
	
	// @Bean
	// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	// 	http
	// 			.authorizeHttpRequests()
	// 			.requestMatchers("/", "/ws/**")
	// 			.permitAll()
	// 			.and()
	// 			.authorizeHttpRequests()
	// 			.anyRequest().authenticated()
	// 			.and()
	// 			.formLogin()
	// 			.and()
	// 			.logout(logout -> logout.logoutSuccessUrl("/"));
	// 	return http.build();
	// }
>>>>>>> cfe2644 (Update Logout et Login maintien des user , create event)
=======

>>>>>>> 8e0880c (Backend updated)
=======

>>>>>>> 27aa8ab (Revision du projet dans le github)
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.userDetailsService(userDetailsService)
				.passwordEncoder(new BCryptPasswordEncoder());
	}

}
