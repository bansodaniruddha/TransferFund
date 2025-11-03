
package com.example.moneytransferotp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.moneytransferotp.repository.UserRepository;
import com.example.moneytransferotp.repository.TransactionRecordRepository;
import com.example.moneytransferotp.model.TransactionRecord;
import com.example.moneytransferotp.model.User;
import com.example.moneytransferotp.service.OtpService;

@Controller
public class TransferController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRecordRepository txRepository;

    @Autowired
    private OtpService otpService;

    @GetMapping({"/", "/transfer"})
    public String transferForm() {
        return "transfer";
    }

    @PostMapping("/generate-otp")
    public String generateOtp(@RequestParam String senderEmail,
                              @RequestParam String receiverEmail,
                              @RequestParam Double amount,
                              Model model) {
        User sender = userRepository.findByEmail(senderEmail);
        User receiver = userRepository.findByEmail(receiverEmail);
        if (sender == null || receiver == null) {
            model.addAttribute("msg", "Sender or receiver email not found. Use sample users or create users in DB."); 
            return "result";
        }
        if (sender.getBalance() < amount) {
            model.addAttribute("msg", "Insufficient balance."); 
            return "result";
        }
        String otp = otpService.generateOtp(senderEmail);
        model.addAttribute("info", "OTP generated (dummy): " + otp);
        model.addAttribute("senderEmail", senderEmail);
        model.addAttribute("receiverEmail", receiverEmail);
        model.addAttribute("amount", amount);
        return "verify-otp";
    }

    @PostMapping("/verify-otp")
    public String verifyAndTransfer(@RequestParam String senderEmail,
                                    @RequestParam String receiverEmail,
                                    @RequestParam Double amount,
                                    @RequestParam String otp,
                                    Model model) {
        boolean ok = otpService.validateOtp(senderEmail, otp);
        if (!ok) {
            model.addAttribute("msg", "Invalid or expired OTP."); 
            return "result";
        }
        User sender = userRepository.findByEmail(senderEmail);
        User receiver = userRepository.findByEmail(receiverEmail);
        if (sender == null || receiver == null) {
            model.addAttribute("msg", "Sender or receiver not found."); 
            return "result";
        }
        if (sender.getBalance() < amount) {
            model.addAttribute("msg", "Insufficient balance."); 
            return "result";
        }
        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);
        userRepository.save(sender);
        userRepository.save(receiver);

        TransactionRecord tr = new TransactionRecord();
        tr.setSenderEmail(senderEmail);
        tr.setReceiverEmail(receiverEmail);
        tr.setAmount(amount);
        txRepository.save(tr);

        model.addAttribute("msg", "Transaction successful. Amount transferred: " + amount);
        return "result";
    }
}
