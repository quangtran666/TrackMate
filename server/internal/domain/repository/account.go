package repository

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
)

type AccountRepository interface {
	Save(ctx context.Context, account *entity.Account) error
	GetAccountsByUserID(ctx context.Context, userID string) ([]*entity.Account, error)
	DeactivateAccount(ctx context.Context, userID string, accountID string) error
}
