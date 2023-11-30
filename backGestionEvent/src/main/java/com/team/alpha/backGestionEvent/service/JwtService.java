package com.team.alpha.backGestionEvent.service;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JwtService {
	static final long EXPIRATIONTIME = 86400000; // 1 day in ms
	static final String PREFIX = "Bearer";
	// Generate secret key. Only for the demonstration
	// You should read it from the application configuration
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	// Generate JWT token

	public String getToken(String username) {
		String token = Jwts.builder()
				.setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(key)
				.compact();
		return token;
	}

	// public String getToken(String username, String role) {
	// Date now = new Date();
	// Date expiration = new Date(System.currentTimeMillis() + EXPIRATIONTIME);

	// return Jwts.builder()
	// .setSubject(username)
	// .claim("role", role) // Include the user's role as a claim
	// .setIssuedAt(now)
	// .setExpiration(expiration)
	// .signWith(SignatureAlgorithm.HS512, key)
	// .compact();
	// }
	public String getToken(String username, String role) {
		JwtBuilder builder = Jwts.builder()
				.setSubject(username)
				.claim("role", role)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(key);

		return builder.compact();
	}

	// Get a token from request Authorization header,
	// parse a token and get username
	public String getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (token != null) {
			String user = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token.replace(PREFIX, ""))
					.getBody()
					.getSubject();

			if (user != null)
				return user;
		}

		return null;
	}

}