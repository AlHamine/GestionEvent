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
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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

	@SuppressWarnings("deprecation")
	@Bean
	SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
		return http
				.csrf(csrf -> csrf.disable())
				.cors(withDefaults()) // Assurez-vous que cette ligne n'est pas en commentaire
				.sessionManagement(management -> management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorizeRequests -> authorizeRequests
						.requestMatchers(HttpMethod.POST, "/login", "http://localhost:3000/**",
								"/event")
						.permitAll()
						.requestMatchers(HttpMethod.POST, "/prestataires", "prestataires/prestatairephoto").permitAll()
						.requestMatchers(HttpMethod.POST, "/client", "/client/clientphoto").permitAll()
						.requestMatchers("/websocket/**").permitAll()
						.requestMatchers(HttpMethod.GET, "/prestataires/**").permitAll()
						.requestMatchers(HttpMethod.GET, "/prestataires/{fileName}").permitAll()
						.requestMatchers(HttpMethod.POST, "/prestataires/reviews").permitAll()
						.requestMatchers(HttpMethod.GET, "/client/**").permitAll()
						.requestMatchers(HttpMethod.GET, "/event/**").permitAll()
						.anyRequest().authenticated())
				.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
				.addFilterBefore(authenticationFilter,
						UsernamePasswordAuthenticationFilter.class)
				.httpBasic(withDefaults())
				.build();
	}

	// Moins de security
	// @Bean
	// SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
	// // Add this row
	// http.csrf().disable().cors().and()
	// .authorizeHttpRequests().anyRequest().permitAll();
	// return http.build();
	// }

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

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.userDetailsService(userDetailsService)
				.passwordEncoder(new BCryptPasswordEncoder());
	}

}
