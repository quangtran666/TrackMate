package account

import (
	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/internal/app/handlers"
	"github.com/quangtran666/TrackMate/internal/app/middleware"
	"github.com/quangtran666/TrackMate/internal/constants"
	"github.com/quangtran666/TrackMate/internal/usecase"
)

var (
	AccountPath = constants.BasePath + "/accounts"
)

type AccountHandler struct {
	accountUsecase usecase.AccountUsecase
	*handlers.Handler
}

func NewAccountHandler(accountUsecase usecase.AccountUsecase, handler *handlers.Handler) *AccountHandler {
	return &AccountHandler{
		accountUsecase: accountUsecase,
		Handler:        handler,
	}
}

func (h *AccountHandler) CreateAccount(c *gin.Context) {
	var req usecase.CreateAccountRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		h.BadRequestResponse(c, "Invalid request body", err)
		return
	}

	userID, ok := middleware.GetUserID(c)
	if !ok || userID == "" {
		h.UnauthorizedResponse(c, "User not authenticated", nil)
		return
	}

	account, err := h.accountUsecase.CreateAccount(c, userID, &req)
	if err != nil {
		h.InternalServerErrorResponse(c, "Failed to create account", err)
		return
	}

	h.CreatedResponse(c, "Account created successfully", account, h.BuildResourcePath(AccountPath, account.ID))
}

func (h *AccountHandler) GetAccountGroups(c *gin.Context) {
	userID, ok := middleware.GetUserID(c)
	if !ok || userID == "" {
		h.UnauthorizedResponse(c, "User not authenticated", nil)
		return
	}

	accountGroups, err := h.accountUsecase.GetAccountGroups(c, userID)
	if err != nil {
		h.InternalServerErrorResponse(c, "Failed to retrieve account groups", err)
		return
	}

	h.SuccessResponse(c, "Account groups retrieved successfully", accountGroups)
}
