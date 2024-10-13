package controllers

import (
	"encoding/json"
	"feedback-backend/models"
	"feedback-backend/services"
	"feedback-backend/validators"
	"log"
	"net/http"
)

func SubmitFeedback(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var feedback models.Feedback
	if err := json.NewDecoder(r.Body).Decode(&feedback); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		log.Printf("Error decoding feedback: %v", err)
		return
	}

	if err := validators.Validate.Struct(feedback); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		log.Printf("Validation error: %v", err)
		return
	}

	if err := services.CreateFeedback(feedback); err != nil {
		http.Error(w, "Failed to create feedback", http.StatusInternalServerError)
		log.Printf("Error creating feedback: %v", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(feedback)
}

func FetchFeedback(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	feedbacks, err := services.FetchFeedbacks()
	if err != nil {
		http.Error(w, "Failed to retrieve feedbacks", http.StatusInternalServerError)
		log.Printf("Error in FetchFeedback controller: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(feedbacks)
}
