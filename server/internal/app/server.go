package app

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/config"
	"github.com/quangtran666/TrackMate/internal/app/handlers"
	"github.com/quangtran666/TrackMate/internal/app/handlers/budget"
	"github.com/quangtran666/TrackMate/internal/app/middleware"
	"github.com/quangtran666/TrackMate/internal/infrastructure/database"
	"github.com/quangtran666/TrackMate/internal/infrastructure/repository"
	"github.com/quangtran666/TrackMate/internal/usecase"
)

type Server struct {
	config *config.Config
	db     *database.Database
	router *gin.Engine
}

func NewServer(cfg *config.Config, db *database.Database) *Server {
	server := &Server{
		config: cfg,
		db:     db,
		router: gin.Default(),
	}

	server.setupMiddleware()
	server.setupRoutes()

	return server
}

func (s *Server) setupMiddleware() {
	s.router.Use(middleware.RequestLogger(s.config))
}

func (s *Server) setupRoutes() {
	api := s.router.Group("/api/v1")

	// Initialize base handler
	baseHandler := handlers.NewHandler(s.db, s.config)

	// Initialize budget dependencies
	budgetRepo := repository.NewBudgetRepository(s.db)
	budgetUsecase := usecase.NewBudgetUsecase(budgetRepo)
	budgetHandler := budget.NewBudgetHandler(budgetUsecase, baseHandler)

	// Register routes
	budget.RegisterBudgetRoutes(api, budgetHandler)

	// Health check endpoint (moved from base handler to server level)
	s.router.GET("/health", baseHandler.HealthCheck)
}

func (s *Server) Run() {
	addr := s.config.GetServerAddress()
	log.Printf("Server starting on %s", addr)
	if err := s.router.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
