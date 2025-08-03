package budget

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/internal/app/handlers"
	"github.com/quangtran666/TrackMate/internal/domain/entity"
	"github.com/quangtran666/TrackMate/internal/usecase"
)

type BudgetHandler struct {
	budgetUsecase usecase.BudgetUsecase
	*handlers.Handler
}

func NewBudgetHandler(budgetUsecase usecase.BudgetUsecase, handler *handlers.Handler) *BudgetHandler {
	return &BudgetHandler{
		budgetUsecase: budgetUsecase,
		Handler:       handler,
	}
}

func (h *BudgetHandler) CreateBudget(c *gin.Context) {
	var req entity.Budget

	if err := c.ShouldBindJSON(&req); err != nil {
		h.ErrorResponse(c, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	panic("not implemented")
}
