package main

import (
	"log"

	"github.com/quangtran666/TrackMate/config"
	"github.com/quangtran666/TrackMate/internal/app"
	"github.com/quangtran666/TrackMate/internal/infrastructure/database/mongo"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading configuration: %v", err)
	}

	// Connect to database
	db, err := mongo.NewDatabase(cfg.GetMongoDBURI())
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	defer db.Close()

	// Initialize server with dependency injection
	server := app.NewServer(cfg, db)

	// Start server
	log.Printf("Server is starting at %s", cfg.GetServerAddress())
	log.Println("Successfully connected to MongoDB")
	server.Run()
}
