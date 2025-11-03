
package com.example.moneytransferotp.model;

import jakarta.persistence.*;

@Entity
public class Beneficiary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String accountNumber;

    @ManyToOne
    private User user;

    public Beneficiary() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
