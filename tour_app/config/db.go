package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	JWTSecret  string
}

var AppConfig Config

func LoadConfig() {
	// Load .env file into OS environment
	err := godotenv.Load()
	if err != nil {
		log.Fatal(".env file not found")
	}

	// Read all required config from environment
	AppConfig = Config{
		DBHost:     mustGetEnv("DB_HOST"),
		DBPort:     mustGetEnv("DB_PORT"),
		DBUser:     mustGetEnv("DB_USER"),
		DBPassword: mustGetEnv("DB_PASSWORD"),
		DBName:     mustGetEnv("DB_NAME"),
		JWTSecret:  mustGetEnv("JWT_SECRET"),
	}
}

func ConnectDB() error {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		AppConfig.DBHost,
		AppConfig.DBPort,
		AppConfig.DBUser,
		AppConfig.DBPassword,
		AppConfig.DBName,
	)
	var err error
	DB, err = sqlx.Connect("postgres", dsn)
	return err
}

func mustGetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Missing %s in .env file", key)
	}
	return val
}
