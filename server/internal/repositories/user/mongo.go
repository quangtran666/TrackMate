package user

import (
	"context"

	"github.com/quangtran666/TrackMate/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var (
	CollectionName = "users"
)

type mongoRepository struct {
	collection *mongo.Collection
}

func NewMongoRepository(db *mongo.Database) Repository {
	return &mongoRepository{
		collection: db.Collection(CollectionName),
	}
}

func (r *mongoRepository) UpsertByClerkID(ctx context.Context, user *models.User) error {
	filter := bson.M{"clerk_user_id": user.ClerkUserID}

	update := bson.M{
		"$set": bson.M{
			"email":        user.Email,
			"name":         user.Name,
			"updated_at":   user.UpdatedAt,
			"last_sync_at": user.LastSyncAt,
		},
		"$setOnInsert": bson.M{
			"_id":        user.ID,
			"created_at": user.CreatedAt,
		},
	}

	opts := options.UpdateOne().SetUpsert(true)
	_, err := r.collection.UpdateOne(ctx, filter, update, opts)
	return err
}

func (r *mongoRepository) FindByClerkID(ctx context.Context, clerkUserID string) (*models.User, error) {
	var user models.User
	filter := bson.M{"clerk_user_id": clerkUserID}

	err := r.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
