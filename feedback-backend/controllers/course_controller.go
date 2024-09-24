package controllers

import (
	"encoding/json"
	"feedback-backend/models"
	"feedback-backend/services"
	"feedback-backend/validators"
	"log"
	"net/http"
)

func GetCourses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	courses, err := services.GetCourses()
	if err != nil {
		http.Error(w, "Failed to retrieve courses", http.StatusInternalServerError)
		log.Printf("Error in GetCourses controller: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(courses)
}

func CreateCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var course models.Course
	if err := json.NewDecoder(r.Body).Decode(&course); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	if err := validators.Validate.Struct(course); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := services.CreateCourse(course); err != nil {
		http.Error(w, "Failed to create a course", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(course)
}
