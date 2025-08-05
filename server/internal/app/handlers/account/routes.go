package account

import "github.com/gin-gonic/gin"

func RegisterAccountRoutes(router *gin.RouterGroup, handler *AccountHandler) {
	accountRoutes := router.Group("/accounts")
	accountRoutes.POST("", handler.CreateAccount)
}
