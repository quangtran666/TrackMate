package entity

import "time"

type Category struct {
	ID           string    `json:"id" bson:"_id,omitempty"`
	UserID       string    `json:"user_id" bson:"user_id"`
	CategoryName string    `json:"category_name" bson:"category_name"`
	CategoryType string    `json:"category_type" bson:"category_type"`
	Display      Display   `json:"display" bson:"display"`
	CreatedAt    time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" bson:"updated_at"`
}

type Display struct {
	Color string `json:"color" bson:"color"`
	Icon  string `json:"icon" bson:"icon"`
}
