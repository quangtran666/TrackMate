package usecase

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	"github.com/quangtran666/TrackMate/internal/domain/repository"
)

type AccountUsecase interface {
	CreateAccount(ctx context.Context, userID string, req *CreateAccountRequest) (*entity.Account, error)
}

type CreateAccountRequest struct {
	AccountName string  `json:"accountName" binding:"required"`
	AccountType string  `json:"accountType" binding:"required"`
	Amount      float64 `json:"amount" binding:"required,gte=0"`
	Currency    string  `json:"currency" binding:"required"`
}

type AccountUsecaseImpl struct {
	accountRepo repository.AccountRepository
}

func NewAccountUsecase(accountRepo repository.AccountRepository) AccountUsecase {
	return &AccountUsecaseImpl{
		accountRepo: accountRepo,
	}
}

func (u *AccountUsecaseImpl) CreateAccount(ctx context.Context, userID string, req *CreateAccountRequest) (*entity.Account, error) {
	account := &entity.Account{
		UserID:      userID,
		AccountName: req.AccountName,
		AccountType: req.AccountType,
		Balance: entity.Balance{
			Amount:   req.Amount,
			Currency: req.Currency,
		},
		Stats: entity.AccountStats{
			TotalIncome:       0,
			TotalExpense:      0,
			TransactionsCount: 0,
		},
	}

	if err := u.accountRepo.Save(ctx, account); err != nil {
		return nil, err
	}

	return account, nil
}
