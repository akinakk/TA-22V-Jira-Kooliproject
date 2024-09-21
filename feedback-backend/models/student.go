package models

type Student struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ClassNumber string `json:"class_number"`
}
