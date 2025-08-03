package entity

import "time"

type Transaction struct {
	ID              string      `json:"id" bson:"_id,omitempty"`
	UserID          string      `json:"user_id" bson:"user_id"`
	Amount          Amount      `json:"amount" bson:"amount"`
	FromAccountID   string      `json:"from_account_id,omitempty" bson:"from_account_id,omitempty"`
	ToAccountID     string      `json:"to_account_id,omitempty" bson:"to_account_id,omitempty"`
	Category        CategoryRef `json:"category" bson:"category"`
	Description     string      `json:"description,omitempty" bson:"description,omitempty"`
	Source          string      `json:"source" bson:"source"`
	TransactionDate time.Time   `json:"transaction_date" bson:"transaction_date"`
	CreatedAt       time.Time   `json:"created_at" bson:"created_at"`
	UpdatedAt       time.Time   `json:"updated_at" bson:"updated_at"`
}

type Amount struct {
	Value    float64 `json:"value" bson:"value"`
	Currency string  `json:"currency" bson:"currency"`
}

type CategoryRef struct {
	ID   string `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name"`
	Type string `json:"type" bson:"type"`
}
