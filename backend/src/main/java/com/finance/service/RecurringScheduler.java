package com.finance.service;

import com.finance.model.RecurringTransaction;
import com.finance.model.Transaction;
import com.finance.repository.RecurringRepository;
import com.finance.repository.TransactionRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class RecurringScheduler {
    private final RecurringRepository recurring;
    private final TransactionRepository transactions;
    public RecurringScheduler(RecurringRepository recurring, TransactionRepository transactions) {
        this.recurring = recurring; this.transactions = transactions;
    }

    // Runs daily. The occurrence key makes retries safe if a process stops after saving a transaction.
    @Scheduled(cron = "0 10 0 * * *")
    public void postDueTransactions() {
        LocalDate today = LocalDate.now();
        for (RecurringTransaction item : recurring.findByActiveTrue()) {
            LocalDate next = item.getNextDate();
            if (next == null) continue;
            boolean changed = false;
            int safetyLimit = 120;
            while (!next.isAfter(today) && safetyLimit-- > 0) {
                if (!transactions.existsByRecurringSourceIdAndRecurringOccurrenceDate(item.getId(), next)) {
                    Transaction tx = new Transaction();
                    tx.setUserId(item.getUserId()); tx.setType(item.getType());
                    tx.setCategory(item.getCategory()); tx.setDescription(item.getDescription());
                    tx.setAmountPaise(item.getAmountPaise()); tx.setDate(next);
                    tx.setRecurring(true); tx.setRecurringSourceId(item.getId());
                    tx.setRecurringOccurrenceDate(next);
                    transactions.save(tx);
                }
                next = switch (item.getFrequency().toUpperCase()) {
                    case "WEEKLY" -> next.plusWeeks(1);
                    case "YEARLY" -> next.plusYears(1);
                    default -> next.plusMonths(1);
                };
                changed = true;
            }
            if (changed) { item.setNextDate(next); recurring.save(item); }
        }
    }
}
