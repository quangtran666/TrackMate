package context

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/gin-gonic/gin"
)

type AuthContext struct {
	SessionClaims *clerk.SessionClaims
	UserID        string
}

var (
	AuthContextKey = "auth_ctx"
)

func SetAuthData(c *gin.Context, claims *clerk.SessionClaims) {
	authctx := &AuthContext{
		SessionClaims: claims,
		UserID:        claims.Subject,
	}
	c.Set(AuthContextKey, authctx)
}

func GetAuthData(c *gin.Context) (*AuthContext, bool) {
	authctx, exists := c.Get(AuthContextKey)
	if !exists {
		return nil, false
	}

	sessionClaims, ok := authctx.(*AuthContext)
	return sessionClaims, ok
}
