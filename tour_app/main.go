package main

import (
	"log"
	"net/http"
	"os"
	"tour-guide-app/config"
	"tour-guide-app/middleware"
	"tour-guide-app/routes"
)

func main() {
	// Load .env configuration
	config.LoadConfig()

	// Connect to PostgreSQL
	if err := config.ConnectDB(); err != nil {
		log.Fatal("DB connection failed:", err)
	}

	// Run migrations
	if data, err := os.ReadFile("migrations/init.sql"); err == nil {
		config.DB.Exec(string(data))
	}
	mux := http.NewServeMux()
	routes.RegisterRoutes(mux)

	port := ":8080"
	log.Println("Server running on", port)
	http.ListenAndServe(port, middleware.CORS(mux))
}
