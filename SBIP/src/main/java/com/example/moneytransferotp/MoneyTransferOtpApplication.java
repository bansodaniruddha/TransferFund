
package com.example.moneytransferotp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.moneytransferotp.model.User;
import com.example.moneytransferotp.repository.UserRepository;

@SpringBootApplication
public class MoneyTransferOtpApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoneyTransferOtpApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User u1 = new User();
                u1.setName("Saurabh");
                u1.setEmail("saurabh@example.com");
                u1.setPassword("password");
                u1.setBalance(10000.0);
                userRepository.save(u1);

                User u2 = new User();
                u2.setName("Ravi");
                u2.setEmail("ravi@example.com");
                u2.setPassword("password");
                u2.setBalance(5000.0);
                userRepository.save(u2);
            }
        };
    }
}
