
package com.example.moneytransferotp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.moneytransferotp.model.OtpVerification;
import com.example.moneytransferotp.repository.OtpVerificationRepository;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpVerificationRepository otpRepo;

    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        OtpVerification v = otpRepo.findByEmail(email);
        if (v == null) v = new OtpVerification();
        v.setEmail(email);
        v.setOtp(otp);
        v.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepo.save(v);
        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        OtpVerification v = otpRepo.findByEmail(email);
        if (v == null) return false;
        if (v.getExpiryTime().isBefore(LocalDateTime.now())) return false;
        return v.getOtp().equals(otp);
    }
}
