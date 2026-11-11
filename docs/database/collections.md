# MongoDB collections

| Collection | Ownership | Important fields |
|---|---|---|
| users | user record | name, unique normalized email, BCrypt passwordHash |
| transactions | userId | type, category, description, amountPaise, date, paymentMethod |
| budgets | userId | category, limitPaise, month (`YYYY-MM`) |
| financialGoals | userId | name, targetPaise, savedPaise, targetDate |
| recurringTransactions | userId | type, category, amountPaise, frequency, nextDate, active |

All amounts are positive integer paise; `type` determines whether a transaction is income or expense. Never store bank login credentials or card CVV values.
