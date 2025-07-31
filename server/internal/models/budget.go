package models

type Budget struct {
	ID        string  `json:"id" bson:"_id"`
	UserID    string  `json:"user_id" bson:"user_id"`
	Name      string  `json:"name" bson:"name"`
	Amount    float64 `json:"amount" bson:"amount"`
	CreatedAt string  `json:"created_at" bson:"created_at"`
	UpdatedAt string  `json:"updated_at" bson:"updated_at"`
}
