package mongo

import (
	"context"
	"time"

	"github.com/quangtran666/TrackMate/internal/domain/entity"
	mongodb "github.com/quangtran666/TrackMate/internal/infrastructure/database/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func (r *AccountRepositoryImpl) GetAccountsByUserID(ctx context.Context, userID string) ([]*entity.Account, error) {
	collection := r.db.DB.Collection(AccountCollectionName)

	filter := bson.M{"user_id": userID, "is_active": true}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var accounts []*entity.Account
	if err = cursor.All(ctx, &accounts); err != nil {
		return nil, err
	}

	return accounts, nil
}

func (r *AccountRepositoryImpl) DeactivateAccount(ctx context.Context, userID string, accountID string) error {
	collection := r.db.DB.Collection(AccountCollectionName)

	// Ensure the account belongs to user and is currently active
	filter := bson.M{"_id": accountID, "user_id": userID, "is_active": true}
	update := bson.M{
		"$set": bson.M{
			"is_active":  false,
			"updated_at": time.Now(),
		},
	}

	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}
