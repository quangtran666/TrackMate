package middleware

import (
	"log"
	"net/http"
	"net/url"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/config"
)

var (
	UserIDKey = "user_id"
)

func RequireAuth0(cfg *config.Config) gin.HandlerFunc {
	if cfg.Auth0Domain == "" || cfg.Auth0Audience == "" {
		log.Fatal("Auth0 configuration is missing")
	}

	issuerURL, err := url.Parse("https://" + cfg.Auth0Domain + "/")
	if err != nil {
		log.Fatalf("Failed to parse the issuer URL: %v", err)
	}

	provider := jwks.NewCachingProvider(issuerURL, 5*time.Minute)

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{cfg.Auth0Audience},
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		log.Fatalf("Failed to set up the jwt validator: %v", err)
	}

	errorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("JWT validation error: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"success":false,"message":"Invalid or expired token","timestamp":"` + time.Now().Format(time.RFC3339) + `"}`))
	}

	middleware := jwtmiddleware.New(jwtValidator.ValidateToken, jwtmiddleware.WithErrorHandler(errorHandler))

	return func(c *gin.Context) {
		middleware.CheckJWT(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			token := r.Context().Value(jwtmiddleware.ContextKey{})
			if claims, ok := token.(*validator.ValidatedClaims); ok {
				c.Set(UserIDKey, claims.RegisteredClaims.Subject)
			}
			c.Next()
		})).ServeHTTP(c.Writer, c.Request)
	}
}

func GetUserID(c *gin.Context) (string, bool) {
	userID, exists := c.Get(UserIDKey)
	if !exists {
		return "", false
	}
	id, ok := userID.(string)
	return id, ok
}
