package models

type Course struct {
	ID         int    `json:"id"`
	CourseName string `json:"course_name" validate:"required"`
}
