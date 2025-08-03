package entity

import "time"

type Goal struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	UserID    string    `json:"user_id" bson:"user_id"`
	GoalName  string    `json:"goal_name" bson:"goal_name"`
	GoalType  string    `json:"goal_type" bson:"goal_type"`
	Target    Target    `json:"target" bson:"target"`
	Current   Current   `json:"current" bson:"current"`
	Funding   Funding   `json:"funding" bson:"funding"`
	Display   Display   `json:"display" bson:"display"`
	Status    string    `json:"status" bson:"status"`
	CreatedAt time.Time `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type Target struct {
	Amount   float64   `json:"amount" bson:"amount"`
	Currency string    `json:"currency" bson:"currency"`
	Date     time.Time `json:"date" bson:"date"`
}

type Current struct {
	Amount      float64   `json:"amount" bson:"amount"`
	Progress    float64   `json:"progress" bson:"progress"`
	LastUpdated time.Time `json:"last_updated" bson:"last_updated"`
}

type Funding struct {
	SourceAccountID string `json:"source_account_id,omitempty" bson:"source_account_id,omitempty"`
	SourceName      string `json:"source_name,omitempty" bson:"source_name,omitempty"`
	SourceType      string `json:"source_type,omitempty" bson:"source_type,omitempty"`
}
