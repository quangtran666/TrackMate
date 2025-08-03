package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/quangtran666/TrackMate/config"
)

// RequestLogger returns a gin.HandlerFunc (middleware) that logs requests.
// It requires the application configuration to be passed in.
func RequestLogger(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Start timer
		start := time.Now()
		path := c.Request.URL.Path
		raw := c.Request.URL.RawQuery

		// Generate request ID
		requestID := uuid.New().String()
		c.Set("RequestID", requestID)

		// Process request
		c.Next()

		// Stop timer
		stop := time.Now()
		latency := stop.Sub(start)

		clientIP := c.ClientIP()
		method := c.Request.Method
		statusCode := c.Writer.Status()
		errorMessage := c.Errors.ByType(gin.ErrorTypePrivate).String()

		if raw != "" {
			path = path + "?" + raw
		}

		// Log request details
		// Use the IsDevelopment method from the config object
		if cfg.IsDevelopment() {
			log.Printf("[GIN] %s | %3d | %13v | %15s | %-7s %#v\n%s",
				requestID,
				statusCode,
				latency,
				clientIP,
				method,
				path,
				errorMessage,
			)
		} else {
			log.Printf("[GIN] %s | %3d | %13v | %15s | %-7s %#v",
				requestID,
				statusCode,
				latency,
				clientIP,
				method,
				path,
			)
		}
	}
}
