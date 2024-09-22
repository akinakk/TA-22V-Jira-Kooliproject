package routes

import (
	"feedback-backend/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/students", controllers.GetStudents).Methods("GET")
	router.HandleFunc("/students", controllers.CreateStudent).Methods("POST")
	return router
}
