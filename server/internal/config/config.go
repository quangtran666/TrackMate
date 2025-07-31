package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	MongoDBURI  string
	ServerPort  string
	ServerHost  string
	Environment string
}

func LoadConfig() (*Config, error) {
	viper.SetDefault("SERVER_PORT", "8080")
	viper.SetDefault("SERVER_HOST", "localhost")
	viper.SetDefault("ENVIRONMENT", "development")

	viper.SetConfigName(".env")
	viper.SetConfigType("env")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./server")
	viper.AddConfigPath("./server/internal/config")

	viper.AutomaticEnv()
	viper.SetEnvPrefix("TRACKMATE")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, fmt.Errorf("error reading config file: %w", err)
		}
		log.Println("Config file not found, using environment variables and defaults")
	}

	config := &Config{
		MongoDBURI:  viper.GetString("MONGODB_URI"),
		ServerPort:  viper.GetString("SERVER_PORT"),
		ServerHost:  viper.GetString("SERVER_HOST"),
		Environment: viper.GetString("ENVIRONMENT"),
	}
	return config, nil
}

func (c *Config) GetMongoDBURI() string {
	return c.MongoDBURI
}

func (c *Config) GetServerAddress() string {
	return fmt.Sprintf("%s:%s", c.ServerHost, c.ServerPort)
}

func (c *Config) IsDevelopment() bool {
	return c.Environment == "development"
}

func (c *Config) IsProduction() bool {
	return c.Environment == "production"
}
