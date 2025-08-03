package repository

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	"github.com/quangtran666/TrackMate/internal/domain/repository"
	"github.com/quangtran666/TrackMate/internal/infrastructure/database"
)

// BudgetRepositoryImpl implements the BudgetRepository interface using MongoDB
type BudgetRepositoryImpl struct {
	db *database.Database
}

// NewBudgetRepository creates a new BudgetRepositoryImpl with database dependency
func NewBudgetRepository(db *database.Database) repository.BudgetRepository {
	return &BudgetRepositoryImpl{
		db: db,
	}
}

// Save implements the BudgetRepository Save method
func (r *BudgetRepositoryImpl) Save(ctx context.Context, budget *entity.Budget) error {
	panic("not implemented")
}
