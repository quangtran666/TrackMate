package repository

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
)

type BudgetRepository interface {
	Save(ctx context.Context, budget *entity.Budget) error
}
