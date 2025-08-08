package account

import "github.com/gin-gonic/gin"

func RegisterAccountRoutes(router *gin.RouterGroup, handler *AccountHandler) {
	accountRoutes := router.Group("/accounts")
	accountRoutes.POST("", handler.CreateAccount)
	accountRoutes.GET("/groups", handler.GetAccountGroups)
	accountRoutes.GET("/:id", handler.GetAccountByID)
	accountRoutes.PUT("/:id", handler.UpdateAccount)
	accountRoutes.DELETE("/:id", handler.DeleteAccount)
}
