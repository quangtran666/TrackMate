package entity

import "time"

type Account struct {
	ID          string       `json:"id" bson:"_id,omitempty"`
	UserID      string       `json:"user_id" bson:"user_id"`
	AccountName string       `json:"account_name" bson:"account_name"`
	AccountType string       `json:"account_type" bson:"account_type"`
	Balance     Balance      `json:"balance" bson:"balance"`
	IsActive    bool         `json:"is_active" bson:"is_active"`
	Stats       AccountStats `json:"stats" bson:"stats"`
	CreatedAt   time.Time    `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at" bson:"updated_at"`
}

type Balance struct {
	Amount   float64 `json:"amount" bson:"amount"`
	Currency string  `json:"currency" bson:"currency"`
}

type AccountStats struct {
	TotalIncome         float64    `json:"total_income" bson:"total_income"`
	TotalExpense        float64    `json:"total_expense" bson:"total_expense"`
	TransactionsCount   int        `json:"transactions_count" bson:"transactions_count"`
	LastTransactionDate *time.Time `json:"last_transaction_date,omitempty" bson:"last_transaction_date,omitempty"`
}
