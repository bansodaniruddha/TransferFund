
package com.example.moneytransferotp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.moneytransferotp.model.TransactionRecord;

public interface TransactionRecordRepository extends JpaRepository<TransactionRecord, Long> {
}
