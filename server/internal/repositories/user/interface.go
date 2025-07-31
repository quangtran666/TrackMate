package user

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/models"
)

type Repository interface {
	UpsertByClerkID(ctx context.Context, user *models.User) error
	FindByClerkID(ctx context.Context, clerkUserID string) (*models.User, error)
}
