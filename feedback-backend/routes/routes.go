package routes

import (
    "github.com/gorilla/mux"
    "feedback-backend/controllers"
)

func SetupRoutes() *mux.Router {
    router := mux.NewRouter()

    router.HandleFunc("/students", controllers.GetStudents).Methods("GET")
    router.HandleFunc("/students", controllers.CreateStudent).Methods("POST")
    return router
}
