package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/config"
	"github.com/quangtran666/TrackMate/internal/infrastructure/database"
)

type Handler struct {
	DB     *database.Database
	Router *gin.Engine
	Config *config.Config
}

func NewHandler(db *database.Database, cfg *config.Config) *Handler {
	if cfg.IsProduction() {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	h := &Handler{
		DB:     db,
		Router: gin.Default(),
		Config: cfg,
	}

	return h
}

type Response struct {
	Success   bool        `json:"success"`
	Message   string      `json:"message"`
	Data      interface{} `json:"data,omitempty"`
	Timestamp time.Time   `json:"timestamp"`
}

type ErrorResponse struct {
	Success   bool      `json:"success"`
	Message   string    `json:"message"`
	Error     string    `json:"error"`
	Timestamp time.Time `json:"timestamp"`
}

func (h *Handler) SuccessResponse(c *gin.Context, message string, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Success:   true,
		Message:   message,
		Data:      data,
		Timestamp: time.Now(),
	})
}

func (h *Handler) CreatedResponse(c *gin.Context, message string, data interface{}, resourcePath string) {
	c.Header("Location", resourcePath)

	c.JSON(http.StatusCreated, Response{
		Success:   true,
		Message:   message,
		Data:      data,
		Timestamp: time.Now(),
	})
}

func (h *Handler) ErrorResponse(c *gin.Context, statusCode int, message string, err error) {
	errorDetail := ""
	if err != nil && !h.Config.IsProduction() {
		errorDetail = err.Error()
	}

	c.JSON(statusCode, ErrorResponse{
		Success:   false,
		Message:   message,
		Error:     errorDetail,
		Timestamp: time.Now(),
	})
}

func (h *Handler) BadRequestResponse(c *gin.Context, message string, err error) {
	h.ErrorResponse(c, http.StatusBadRequest, message, err)
}

func (h *Handler) NotFoundResponse(c *gin.Context, message string, err error) {
	h.ErrorResponse(c, http.StatusNotFound, message, err)
}

func (h *Handler) UnauthorizedResponse(c *gin.Context, message string, err error) {
	h.ErrorResponse(c, http.StatusUnauthorized, message, err)
}

func (h *Handler) ForbiddenResponse(c *gin.Context, message string, err error) {
	h.ErrorResponse(c, http.StatusForbidden, message, err)
}

func (h *Handler) InternalServerErrorResponse(c *gin.Context, message string, err error) {
	h.ErrorResponse(c, http.StatusInternalServerError, message, err)
}

func (h *Handler) BuildResourcePath(basePath, id string) string {
	return basePath + "/" + id
}

func (h *Handler) HealthCheck(c *gin.Context) {
	h.SuccessResponse(c, "Server is running and healthy", gin.H{
		"status":    "running",
		"timestamp": time.Now(),
	})
}
