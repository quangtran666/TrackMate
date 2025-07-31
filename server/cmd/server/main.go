package main

import (
	"log"

	"github.com/quangtran666/TrackMate/internal/config"
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

	log.Printf("Server is running at %s", cfg.GetServerAddress())
	log.Println("Successfully connected to MongoDB")
}
