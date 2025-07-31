package models

type Expense struct {
	ID          string  `json:"id" bson:"_id"`
	UserID      string  `json:"user_id" bson:"user_id"`
	BudgetID    string  `json:"budget_id" bson:"budget_id"`
	Amount      float64 `json:"amount" bson:"amount"`
	Description string  `json:"description" bson:"description"`
	Category    string  `json:"category" bson:"category"`
	CreatedAt   string  `json:"created_at" bson:"created_at"`
	UpdatedAt   string  `json:"updated_at" bson:"updated_at"`
}
