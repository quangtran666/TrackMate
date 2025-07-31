package models

import "time"

type User struct {
	ID          string    `json:"id" bson:"_id"`
	ClerkUserID string    `json:"clerk_user_id" bson:"clerk_user_id"`
	Email       string    `json:"email" bson:"email"`
	Name        string    `json:"name" bson:"name"`
	CreatedAt   time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" bson:"updated_at"`
	LastSyncAt  time.Time `json:"last_sync_at" bson:"last_sync_at"`
}
