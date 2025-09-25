package models

import "time"

type User struct {
	ID        int       `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

type CostSheet struct {
	ID          int       `db:"id" json:"id"`
	UserID      int       `db:"user_id" json:"user_id"`
	SheetName   string    `db:"sheet_name" json:"sheet_name"`
	TourPlace   string    `db:"tour_place" json:"tour_place"`
	TotalAmount float64   `db:"total_amount" json:"total_amount"`
	Currency    string    `db:"currency" json:"currency"`
	Status      string    `db:"status" json:"status"`
	Notes       string    `db:"notes" json:"notes"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}

type CostData struct {
	ID              int       `db:"id" json:"id"`
	UserID          int       `db:"user_id" json:"user_id"`
	CostSheetID     int       `db:"cost_sheet_id" json:"cost_sheet_id"`
	CostType        string    `db:"cost_type" json:"cost_type"`
	CostDescription string    `db:"cost_description" json:"cost_description"`
	Amount          float64   `db:"amount" json:"amount"`
	CostDate        time.Time `db:"cost_date" json:"cost_date"`
	CreatedAt       time.Time `db:"created_at" json:"created_at"`
	UpdatedAt       time.Time `db:"updated_at" json:"updated_at"`
}
