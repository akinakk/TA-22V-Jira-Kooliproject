package db

import (
	"database/sql"
	"log"

	_ "github.com/jackc/pgx/v4/stdlib"
)

var DB *sql.DB

func ConnectDB() {
	var err error

	connStr := "postgres://postgres:Akaimpc2000xl@localhost:5432/school_db?sslmode=disable"
	DB, err = sql.Open("pgx", connStr)
	if err != nil {
		log.Fatalf("Database connection error: %v", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("Error pinging the database: %v", err)
	}

	log.Println("Successful connection to the database")
}
