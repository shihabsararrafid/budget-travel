package routes

import (
	"net/http"
	"tour-guide-app/controllers"
	"tour-guide-app/middleware"
)

func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/register", controllers.Register)
	mux.HandleFunc("/login", controllers.Login)

	mux.HandleFunc("/api/sheets", middleware.JWTAuth(controllers.CreateCostSheet))
	mux.HandleFunc("/api/sheets/list", middleware.JWTAuth(controllers.ListCostSheets))
	mux.HandleFunc("/api/costs", middleware.JWTAuth(controllers.CreateCostData))
	mux.HandleFunc("/api/costs/list", middleware.JWTAuth(controllers.ListCostDetails))
}
