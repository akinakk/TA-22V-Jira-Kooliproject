package models

type Student struct {
    ID          int    `json:"id"`
    Name        string `json:"name" validate:"required"`
    ClassNumber string `json:"class_number" validate:"required"`
}
