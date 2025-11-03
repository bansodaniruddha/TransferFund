
# Money Transfer OTP (Dummy) - Spring Boot

## What this project contains
- Spring Boot (Maven) project with Thymeleaf frontend
- Dummy OTP is generated and shown on the verify page (for learning/testing purposes)
- Entities: User, Beneficiary, TransactionRecord, OtpVerification
- Repositories, OtpService, TransferController
- Sample users are created automatically on startup:
  - saurabh@example.com (balance 10000)
  - ravi@example.com (balance 5000)

## Defaults
- MySQL username: root
- MySQL password: root
- Database: money_transfer_db
- Server port: 8080

## How to run
1. Create the database in MySQL Workbench:
   `CREATE DATABASE money_transfer_db;`
2. Update `src/main/resources/application.properties` if your DB credentials differ.
3. Open the project in IntelliJ (File -> Open -> select the folder with pom.xml)
4. Run `MoneyTransferOtpApplication.java`
5. Open browser: http://localhost:8080/transfer
6. Use sample users to test the flow.

Note: This is a demo app. For production, do not show OTP on screen and secure credentials properly.
