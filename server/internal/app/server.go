package app

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/quangtran666/TrackMate/config"
	"github.com/quangtran666/TrackMate/internal/app/handlers"
	"github.com/quangtran666/TrackMate/internal/app/handlers/budget"
	"github.com/quangtran666/TrackMate/internal/app/middleware"
	"github.com/quangtran666/TrackMate/internal/infrastructure/database/mongo"
	mongoRepo "github.com/quangtran666/TrackMate/internal/infrastructure/repository/mongo"
	"github.com/quangtran666/TrackMate/internal/usecase"
)

type Server struct {
	config *config.Config
	db     *mongo.MongoDatabase
	router *gin.Engine
}

func NewServer(cfg *config.Config, db *mongo.MongoDatabase) *Server {
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
	s.router.Use(gin.Logger())
}

func (s *Server) setupRoutes() {
	baseHandler := handlers.NewHandler(s.db, s.config)
	s.router.GET("/health", baseHandler.HealthCheck)
	api := s.router.Group("/api/v1")

	protected := api.Group("")
	protected.Use(middleware.RequireAuth0(s.config))
	{
		protected.GET("/temp", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Hello from /temp"})
		})
		budgetRepo := mongoRepo.NewBudgetRepository(s.db)
		budgetUsecase := usecase.NewBudgetUsecase(budgetRepo)
		budgetHandler := budget.NewBudgetHandler(budgetUsecase, baseHandler)
		budget.RegisterBudgetRoutes(protected, budgetHandler)
	}
}

func (s *Server) Run() {
	addr := s.config.GetServerAddress()
	log.Printf("Server starting on %s", addr)
	if err := s.router.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
