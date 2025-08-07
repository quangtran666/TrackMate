package usecase

import (
	"context"
	"log"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	"github.com/quangtran666/TrackMate/internal/domain/repository"
)

type AccountUsecase interface {
	CreateAccount(ctx context.Context, userID string, req *CreateAccountRequest) (*entity.Account, error)
	GetAccountGroups(ctx context.Context, userID string) ([]AccountGroup, error)
}

type CreateAccountRequest struct {
	AccountName string  `json:"accountName" binding:"required"`
	AccountType string  `json:"accountType" binding:"required"`
	Amount      float64 `json:"amount" binding:"required,gte=0"`
	Currency    string  `json:"currency" binding:"required"`
}

type AccountDisplay struct {
	ID          string              `json:"id"`
	AccountName string              `json:"accountName"`
	AccountType string              `json:"accountType"`
	Balance     entity.Balance      `json:"balance"`
	IsActive    bool                `json:"isActive"`
	Stats       entity.AccountStats `json:"stats"`
}

type AccountGroup struct {
	Currency     string           `json:"currency"`
	TotalBalance float64          `json:"totalBalance"`
	Accounts     []AccountDisplay `json:"accounts"`
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

func (u *AccountUsecaseImpl) GetAccountGroups(ctx context.Context, userID string) ([]AccountGroup, error) {
	accounts, err := u.accountRepo.GetAccountsByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	accountGroups := make(map[string]*AccountGroup)

	for _, account := range accounts {
		if !account.IsActive {
			continue
		}

		accountDisplay := AccountDisplay{
			ID:          account.ID,
			AccountName: account.AccountName,
			AccountType: account.AccountType,
			Balance:     account.Balance,
			IsActive:    account.IsActive,
			Stats:       account.Stats,
		}

		if group, exists := accountGroups[account.Balance.Currency]; exists {
			group.Accounts = append(group.Accounts, accountDisplay)
			group.TotalBalance += account.Balance.Amount
		} else {
			accountGroups[account.Balance.Currency] = &AccountGroup{
				Currency:     account.Balance.Currency,
				TotalBalance: account.Balance.Amount,
				Accounts:     []AccountDisplay{accountDisplay},
			}
		}
	}

	result := make([]AccountGroup, 0, len(accountGroups))
	for _, group := range accountGroups {
		result = append(result, *group)
	}

	log.Printf("Returning %d account groups", len(result))

	return result, nil
}
