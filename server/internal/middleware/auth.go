package middleware

import (
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	clerkHttp "github.com/clerk/clerk-sdk-go/v2/http"
	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/pkg/context"
)

type AuthMiddleware struct{}

func NewAuthMiddleware(secretKey string) *AuthMiddleware {
	clerk.SetKey(secretKey)
	return &AuthMiddleware{}
}

func (m *AuthMiddleware) RequireAuth() gin.HandlerFunc {
	return gin.WrapH(
		clerkHttp.RequireHeaderAuthorization()(
			http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				c, exists := ginContextFromRequest(r)
				if !exists {
					http.Error(w, "Interal server error", http.StatusInternalServerError)
					return
				}

				claims, ok := clerk.SessionClaimsFromContext(r.Context())
				if ok {
					context.SetAuthData(c, claims)
				}

				c.Next()
			}),
		),
	)
}

func ginContextFromRequest(r *http.Request) (*gin.Context, bool) {
	c, exists := r.Context().Value(gin.ContextKey).(*gin.Context)
	return c, exists
}
