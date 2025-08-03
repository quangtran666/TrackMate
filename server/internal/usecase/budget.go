package usecase

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	"github.com/quangtran666/TrackMate/internal/domain/repository"
)

// BudgetUsecase defines the business logic interface for budget operations
type BudgetUsecase interface {
	CreateBudget(ctx context.Context, budget *entity.Budget) error
}

// BudgetUsecaseImpl implements the BudgetUsecase interface
type BudgetUsecaseImpl struct {
	budgetRepo repository.BudgetRepository
}

// NewBudgetUsecase creates a new BudgetUsecase with dependency injection
func NewBudgetUsecase(budgetRepo repository.BudgetRepository) BudgetUsecase {
	return &BudgetUsecaseImpl{
		budgetRepo: budgetRepo,
	}
}

// CreateBudget creates a new budget with business logic validation
func (u *BudgetUsecaseImpl) CreateBudget(ctx context.Context, budget *entity.Budget) error {
	panic("not implemented")
}
