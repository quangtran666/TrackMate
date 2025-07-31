package webhook

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	webhookService "github.com/quangtran666/TrackMate/internal/services/webhook/clerk"
)

type Handler struct {
	service webhookService.Service
}

func NewHandler(service webhookService.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) HandleClerkWebhook(c *gin.Context) {
	var webhookData map[string]interface{}

	if err := c.ShouldBindJSON(&webhookData); err != nil {
		log.Printf("Invalid webhook JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	userData, ok := webhookData["data"].(map[string]interface{})
	if !ok {
		log.Printf("Invalid webhook data format")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data format"})
		return
	}

	err := h.service.SyncUserWithRetry(c.Request.Context(), userData)
	if err != nil {
		log.Printf("Failed to sync user: %v", err)
	}

	c.JSON(http.StatusOK, gin.H{"status": "processed"})
}
