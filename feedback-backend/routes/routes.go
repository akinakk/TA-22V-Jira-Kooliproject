package routes

import (
	"feedback-backend/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/students", controllers.GetStudents).Methods("GET")
	router.HandleFunc("/students", controllers.CreateStudent).Methods("POST")

	router.HandleFunc("/courses", controllers.GetCourses).Methods("GET")
	router.HandleFunc("/courses", controllers.CreateCourse).Methods("POST")

	router.HandleFunc("/submit-feedback", controllers.FetchFeedback).Methods("GET")
	router.HandleFunc("/submit-feedback", controllers.SubmitFeedback).Methods("POST")

	return router
}
