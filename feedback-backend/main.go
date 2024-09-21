package main

import (
    "log"
    "net/http"
    "feedback-backend/db" 
    "feedback-backend/routes"
)

func main() {
    db.ConnectDB()
    router := routes.SetupRoutes()

    port := ":8080" 
    log.Printf("The server is running on port %s", port)
    if err := http.ListenAndServe(port, router); err != nil {
        log.Fatalf("Error starting the server: %v", err)
    }
}
