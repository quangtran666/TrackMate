package models

type Income struct {
	ID          string  `json:"id" bson:"_id"`
	UserID      string  `json:"user_id" bson:"user_id"`
	Amount      float64 `json:"amount" bson:"amount"`
	Source      string  `json:"source" bson:"source"`
	Description string  `json:"description" bson:"description"`
	CreatedAt   string  `json:"created_at" bson:"created_at"`
	UpdatedAt   string  `json:"updated_at" bson:"updated_at"`
}
