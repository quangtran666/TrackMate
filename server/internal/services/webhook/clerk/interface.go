package webhook

import "context"

type Service interface {
	SyncUser(ctx context.Context, clerUserData map[string]interface{}) error
	SyncUserWithRetry(ctx context.Context, clerkUserData map[string]interface{}) error
}
