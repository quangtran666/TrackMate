package budget

import "github.com/gin-gonic/gin"

func RegisterBudgetRoutes(router *gin.RouterGroup, handler *BudgetHandler) {
	budgetRoutes := router.Group("/budgets")
	budgetRoutes.POST("", handler.CreateBudget)
}
