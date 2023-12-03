package com.team.alpha.backGestionEvent.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.team.alpha.backGestionEvent.model.User;
import com.team.alpha.backGestionEvent.repository.UserRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService  {
	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		Optional<User> user = repository.findByMail(mail); 

		UserBuilder builder = null;
		if (user.isPresent()) {
			User currentUser = user.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(mail);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		} else {
			throw new UsernameNotFoundException("User not found.");
		}

		return builder.build();	    
	}
}
