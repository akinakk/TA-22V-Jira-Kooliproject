package controllers

import (
	"encoding/json"
	"feedback-backend/models"
	"feedback-backend/services"
	"net/http"
)

func GetStudents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	students := services.GetStudents()
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(students)
}

func CreateStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var student models.Student
	if err := json.NewDecoder(r.Body).Decode(&student); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	if student.Name == "" || student.ClassNumber == "" {
		http.Error(w, "Name and ClassNumber are required", http.StatusBadRequest)
		return
	}

	services.CreateStudent(student)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(student)
}
