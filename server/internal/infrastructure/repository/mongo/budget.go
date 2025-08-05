package mongo

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	"github.com/quangtran666/TrackMate/internal/domain/repository"
	mongodb "github.com/quangtran666/TrackMate/internal/infrastructure/database/mongo"
)

type BudgetRepositoryImpl struct {
	db *mongodb.MongoDatabase
}

func NewBudgetRepository(db *mongodb.MongoDatabase) repository.BudgetRepository {
	return &BudgetRepositoryImpl{
		db: db,
	}
}

func (r *BudgetRepositoryImpl) Save(ctx context.Context, budget *entity.Budget) error {
	panic("not implemented")
}
