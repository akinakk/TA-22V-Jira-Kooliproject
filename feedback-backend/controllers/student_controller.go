package controllers

import (
	"encoding/json"
	"feedback-backend/models"
	"feedback-backend/services"
	"feedback-backend/validators"
	"log"
	"net/http"
)

func GetStudents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	students, err := services.GetStudents()
	if err != nil {
		http.Error(w, "Failed to retrieve students", http.StatusInternalServerError)
		log.Printf("Error in GetStudents controller: %v", err)
		return
	}

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

	if err := validators.Validate.Struct(student); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := services.CreateStudent(student); err != nil {
		http.Error(w, "Failed to create student", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(student)
}
