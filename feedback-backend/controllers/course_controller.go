package controllers

import (
	"encoding/json"
	"feedback-backend/models"
	"feedback-backend/services"
	"net/http"
)

func GetCourses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	courses := services.GetCourses()

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

	services.CreateCourse(course)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(course)
}

