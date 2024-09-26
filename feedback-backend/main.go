package main

import (
	"feedback-backend/db"
	"feedback-backend/routes"
    "feedback-backend/middleware"
	"log"
	"net/http"
)

func main() {
	db.ConnectDB()
	router := routes.SetupRoutes()

	port := ":8080"
	log.Printf("The server is running on port %s", port)
    
    if err := http.ListenAndServe(port, middleware.CORS(router)); err != nil {
        log.Fatalf("Error starting the server: %v", err)
    }
}
