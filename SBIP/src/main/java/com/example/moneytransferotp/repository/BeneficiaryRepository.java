
package com.example.moneytransferotp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.moneytransferotp.model.Beneficiary;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
}
