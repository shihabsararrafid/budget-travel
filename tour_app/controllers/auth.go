package controllers

import (
	"encoding/json"
	"net/http"
	"tour-guide-app/config"
	"tour-guide-app/utils"

	"golang.org/x/crypto/bcrypt"
)

type authRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	var req authRequest
	json.NewDecoder(r.Body).Decode(&req)

	hash, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	var id int
	err := config.DB.QueryRow(`INSERT INTO users(email,password_hash) VALUES($1,$2) RETURNING id`,
		req.Email, string(hash)).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	json.NewEncoder(w).Encode(map[string]any{"user_id": id})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var req authRequest
	json.NewDecoder(r.Body).Decode(&req)

	var id int
	var hash string
	err := config.DB.QueryRow(`SELECT id,password_hash FROM users WHERE email=$1`, req.Email).Scan(&id, &hash)
	if err != nil || bcrypt.CompareHashAndPassword([]byte(hash), []byte(req.Password)) != nil {
		http.Error(w, "Invalid credentials", 401)
		return
	}

	token, _ := utils.GenerateToken(id)
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
