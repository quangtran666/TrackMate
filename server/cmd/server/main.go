package main

import (
	"log"

	"github.com/quangtran666/TrackMate/internal/config"
	"github.com/quangtran666/TrackMate/internal/handlers"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading configuration: %v", err)
	}

	db, err := config.NewDatabase(cfg.GetMongoDBURI())
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	defer db.Close()

	baseHandler := handlers.NewHandler(db, cfg)

	log.Printf("Server is running at %s", cfg.GetServerAddress())
	log.Println("Successfully connected to MongoDB")
	if err := baseHandler.Router.Run(cfg.GetServerAddress()); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
