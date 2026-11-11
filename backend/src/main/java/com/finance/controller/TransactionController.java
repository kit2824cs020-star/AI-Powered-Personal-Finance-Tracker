package com.finance.controller;
import com.finance.model.Transaction;import com.finance.repository.TransactionRepository;import jakarta.validation.Valid;import jakarta.validation.constraints.*;import org.springframework.security.core.Authentication;import org.springframework.web.bind.annotation.*;import org.springframework.http.HttpStatus;import org.springframework.web.server.ResponseStatusException;import java.time.LocalDate;import java.util.List;
@RestController @RequestMapping("/api/transactions") public class TransactionController {
 private final TransactionRepository repo;public TransactionController(TransactionRepository r){repo=r;}
 public record TxRequest(@NotBlank String type,@NotBlank String category,@NotBlank String description,@Positive long amountPaise,@NotNull LocalDate date,String paymentMethod,boolean recurring){}
 @GetMapping public List<Transaction> all(Authentication a){return repo.findByUserIdOrderByDateDesc(uid(a));}
 @PostMapping public Transaction create(@Valid @RequestBody TxRequest r,Authentication a){if(!List.of("income","expense").contains(r.type()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"type must be income or expense");Transaction t=new Transaction();apply(t,r);t.setUserId(uid(a));return repo.save(t);}
 @PutMapping("/{id}") public Transaction update(@PathVariable String id,@Valid @RequestBody TxRequest r,Authentication a){Transaction t=repo.findByIdAndUserId(id,uid(a)).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));apply(t,r);return repo.save(t);}
 @DeleteMapping("/{id}") public void delete(@PathVariable String id,Authentication a){var t=repo.findByIdAndUserId(id,uid(a)).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));repo.delete(t);}
 private void apply(Transaction t,TxRequest r){t.setType(r.type());t.setCategory(r.category());t.setDescription(r.description());t.setAmountPaise(r.amountPaise());t.setDate(r.date());t.setPaymentMethod(r.paymentMethod());t.setRecurring(r.recurring());}private String uid(Authentication a){return (String)a.getPrincipal();}
}
