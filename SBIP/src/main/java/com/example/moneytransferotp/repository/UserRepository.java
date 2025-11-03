
package com.example.moneytransferotp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.moneytransferotp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
