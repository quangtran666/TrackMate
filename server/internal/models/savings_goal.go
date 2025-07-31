package models

type SavingsGoal struct {
	ID            string  `json:"id" bson:"_id"`
	UserID        string  `json:"user_id" bson:"user_id"`
	Name          string  `json:"name" bson:"name"`
	TargetAmount  float64 `json:"target_amount" bson:"target_amount"`
	CurrentAmount float64 `json:"current_amount" bson:"current_amount"`
	TargetDate    string  `json:"target_date" bson:"target_date"`
	CreatedAt     string  `json:"created_at" bson:"created_at"`
	UpdatedAt     string  `json:"updated_at" bson:"updated_at"`
}
