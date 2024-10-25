package controllers

import (
	"encoding/json"
	"feedback-backend/models"
	"feedback-backend/services"
	"feedback-backend/validators"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

func FetchFeedbackByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid feedback ID", http.StatusBadRequest)
		return
	}

	feedback, err := services.FetchFeedbackByID(id)
	if err != nil {
		http.Error(w, "Feedback not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(feedback)
}

func DeleteFeedbackByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid feedback ID", http.StatusBadRequest)
		return
	}

	feedback, err := services.DeleteFeedbackByID(id)
	if err != nil {
		if err.Error() == "feedback not found" {
			http.Error(w, "Feedback not found", http.StatusNotFound)
		} else {
			http.Error(w, "Failed to delete feedback", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(feedback)
}

func UpdateFeedbackByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid feedback ID", http.StatusBadRequest)
		return
	}

	var updatedFeedback models.Feedback
	if err := json.NewDecoder(r.Body).Decode(&updatedFeedback); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		log.Printf("Error decoding feedback: %v", err)
		return
	}

	if err := validators.Validate.Struct(updatedFeedback); err != nil {
		http.Error(w, "Validation failed: "+err.Error(), http.StatusBadRequest)
		log.Printf("Validation error: %v", err)
		return
	}

	if err := services.UpdateFeedbackByID(id, updatedFeedback); err != nil {
		http.Error(w, "Failed to update feedback", http.StatusInternalServerError)
		log.Printf("Error updating feedback: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedFeedback)
}
