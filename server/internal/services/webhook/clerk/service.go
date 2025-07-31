package webhook

import (
	"context"
	"fmt"
	"time"

	"github.com/quangtran666/TrackMate/internal/models"
	"github.com/quangtran666/TrackMate/internal/repositories/user"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	MaxRetryAttempts  = 3
	ErrInvalidClerkID = fmt.Errorf("missing or invalid Clerk user ID")
	ErrFailedSync     = func(lastErr error) error {
		return fmt.Errorf("failed after %d attempts: %w", MaxRetryAttempts, lastErr)
	}
)

type service struct {
	userRepo user.Repository
}

func NewService(userRepo user.Repository) Service {
	return &service{
		userRepo: userRepo,
	}
}

func (s *service) SyncUser(ctx context.Context, clerkUserData map[string]interface{}) error {
	clerkID, ok := clerkUserData["id"].(string)
	if !ok || clerkID == "" {
		return ErrInvalidClerkID
	}

	email, _ := clerkUserData["email"].(string)
	name, _ := clerkUserData["name"].(string)

	now := time.Now()
	userModel := &models.User{
		ID:          primitive.NewObjectID().Hex(),
		ClerkUserID: clerkID,
		Email:       email,
		Name:        name,
		CreatedAt:   now,
		UpdatedAt:   now,
		LastSyncAt:  now,
	}

	return s.userRepo.UpsertByClerkID(ctx, userModel)
}

func (s *service) SyncUserWithRetry(ctx context.Context, clerkUserData map[string]interface{}) error {
	var lastErr error

	for attempt := 0; attempt < MaxRetryAttempts; attempt++ {
		err := s.SyncUser(ctx, clerkUserData)
		if err == nil {
			return nil
		}

		lastErr = err

		if attempt < MaxRetryAttempts-1 {
			time.Sleep(time.Second * time.Duration(attempt+1))
		}
	}

	return ErrFailedSync(lastErr)
}
