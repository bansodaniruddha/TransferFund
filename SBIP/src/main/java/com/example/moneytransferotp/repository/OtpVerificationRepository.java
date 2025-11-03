
package com.example.moneytransferotp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.moneytransferotp.model.OtpVerification;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    OtpVerification findByEmail(String email);
}
