	@Bean
SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
    return http
            .csrf(csrf -> csrf.disable())
            .cors(withDefaults())  // Assurez-vous que cette ligne n'est pas en commentaire
            .sessionManagement(management -> management
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeRequests(authorizeRequests -> authorizeRequests
                    .requestMatchers(HttpMethod.POST, "/login").permitAll()
                    .anyRequest().authenticated())
            .exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
            .addFilterBefore(authenticationFilter,
                    UsernamePasswordAuthenticationFilter.class)
            .httpBasic(withDefaults())
            .build();
}
