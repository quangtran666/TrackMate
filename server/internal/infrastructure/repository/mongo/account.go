package mongo

import (
	"context"
	"time"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	mongodb "github.com/quangtran666/TrackMate/internal/infrastructure/database/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	AccountCollectionName = "accounts"
)

type AccountRepositoryImpl struct {
	db *mongodb.MongoDatabase
}

func NewAccountRepository(db *mongodb.MongoDatabase) *AccountRepositoryImpl {
	return &AccountRepositoryImpl{
		db: db,
	}
}

func (r *AccountRepositoryImpl) Save(ctx context.Context, account *entity.Account) error {
	collection := r.db.DB.Collection(AccountCollectionName)

	account.ID = primitive.NewObjectID().Hex()
	account.CreatedAt = time.Now()
	account.UpdatedAt = time.Now()
	account.IsActive = true

	_, err := collection.InsertOne(ctx, account)
	return err
}
