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
	return router
}
