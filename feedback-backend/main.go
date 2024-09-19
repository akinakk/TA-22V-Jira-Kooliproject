package main

import (
    "log"
    "net/http"
    "feedback-backend/db" 
)

func main() {
    db.ConnectDB()

    port := ":8080" 
    log.Printf("The server is running on port %s", port)
    if err := http.ListenAndServe(port, nil); err != nil {
        log.Fatalf("Error starting the server: %v", err)
    }
}
