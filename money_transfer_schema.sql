
-- Create database
CREATE DATABASE IF NOT EXISTS money_transfer;
USE money_transfer;

-- User table
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00
);

-- Beneficiary table
CREATE TABLE IF NOT EXISTS beneficiary (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_account_number VARCHAR(20) NOT NULL,
    beneficiary_account_number VARCHAR(20) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP Verification table
CREATE TABLE IF NOT EXISTS otp_verification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    expiry_time TIMESTAMP NOT NULL
);

-- Transaction Record table
CREATE TABLE IF NOT EXISTS transaction_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_account VARCHAR(20) NOT NULL,
    receiver_account VARCHAR(20) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Users
INSERT INTO user (name, email, account_number, balance) VALUES
('Aniruddha', 'aniruddha@example.com', 'ACC1001', 10000.00),
('Saurabh', 'saurabh@example.com', 'ACC1002', 8000.00),
('Rohit', 'rohit@example.com', 'ACC1003', 5000.00);

-- Sample Beneficiary
INSERT INTO beneficiary (owner_account_number, beneficiary_account_number) VALUES
('ACC1001', 'ACC1002'),
('ACC1002', 'ACC1003');

-- Sample Transaction Record
INSERT INTO transaction_record (sender_account, receiver_account, amount) VALUES
('ACC1001', 'ACC1002', 500.00),
('ACC1002', 'ACC1003', 300.00);
