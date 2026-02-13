// package com.team.alpha.backGestionEvent.service;
// import org.springframework.security.core.userdetails.User;

// import java.util.ArrayList;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.team.alpha.backGestionEvent.model.Client;
// import com.team.alpha.backGestionEvent.repository.ClientRepository;

// @Service
// public class ClientDetailsServiceImpl implements UserDetailsService {

//     @Autowired
//     private ClientRepository clientRepository;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         Client client = clientRepository.findByUsername(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("Client not found with username: " + username));

//         return new User(client.getMail(), client.getPassword(), new ArrayList<>());
//     }
// }