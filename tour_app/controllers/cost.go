package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"
	"tour-guide-app/config"
	"tour-guide-app/models"
)

func CreateCostSheet(w http.ResponseWriter, r *http.Request) {
	userID, _ := strconv.Atoi(r.Header.Get("user_id"))
	var req struct {
		SheetName string `json:"sheet_name"`
		TourPlace string `json:"tour_place"`
		Currency  string `json:"currency"`
		Status    string `json:"status"`
		Notes     string `json:"notes"`
	}
	json.NewDecoder(r.Body).Decode(&req)

	var id int
	err := config.DB.QueryRow(`INSERT INTO cost_sheets(user_id,sheet_name,tour_place,currency,status,notes)
	 VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
		userID, req.SheetName, req.TourPlace, req.Currency, req.Status, req.Notes).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(map[string]any{"id": id})
}

func ListCostSheets(w http.ResponseWriter, r *http.Request) {
	userID, _ := strconv.Atoi(r.Header.Get("user_id"))
	var sheets []models.CostSheet
	if err := config.DB.Select(&sheets, `SELECT * FROM cost_sheets WHERE user_id=$1`, userID); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(sheets)
}
func ListCostDetails(w http.ResponseWriter, r *http.Request) {
	userID, _ := strconv.Atoi(r.Header.Get("user_id"))
	costSheetID, _ := strconv.Atoi(r.URL.Query().Get("cost_sheet_id"))
	var sheets []models.CostData
	if err := config.DB.Select(&sheets, `SELECT * FROM cost_data WHERE user_id=$1 AND cost_sheet_id = $2`, userID, costSheetID); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(sheets)
}
func CreateCostData(w http.ResponseWriter, r *http.Request) {
	userID, _ := strconv.Atoi(r.Header.Get("user_id"))
	var req struct {
		CostSheetID     int     `json:"cost_sheet_id"`
		CostType        string  `json:"cost_type"`
		CostDescription string  `json:"cost_description"`
		Amount          float64 `json:"amount"`
		CostDate        string  `json:"cost_date"`
	}
	json.NewDecoder(r.Body).Decode(&req)

	cd, _ := time.Parse("2006-01-02", req.CostDate)
	var id int
	err := config.DB.QueryRow(`INSERT INTO cost_data(user_id,cost_sheet_id,cost_type,cost_description,amount,cost_date)
	 VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
		userID, req.CostSheetID, req.CostType, req.CostDescription, req.Amount, cd).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	config.DB.Exec(`UPDATE cost_sheets SET total_amount = total_amount + $1 WHERE id=$2`,
		req.Amount, req.CostSheetID)
	json.NewEncoder(w).Encode(map[string]any{"id": id})
}
