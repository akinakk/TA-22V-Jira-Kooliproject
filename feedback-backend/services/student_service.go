package services

import (
	"feedback-backend/models"
)

var students []models.Student

func GetStudents() []models.Student {
	return students
}

func CreateStudent(student models.Student) {
	students = append(students, student)
}
