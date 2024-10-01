package services

import (
	"feedback-backend/db"
	"feedback-backend/models"
	"log"
)

func GetStudents() ([]models.Student, error) {
	query := `SELECT id, name, class_number FROM students`
	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error fetching students: %v", err)
		return nil, err
	}
	defer rows.Close()

	var students []models.Student
	for rows.Next() {
		var student models.Student
		if err := rows.Scan(&student.ID, &student.Name, &student.ClassNumber); err != nil {
			log.Printf("Error scanning student: %v", err)
			return nil, err
		}
		students = append(students, student)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Rows error: %v", err)
		return nil, err
	}

	return students, nil
}

func CreateStudent(student models.Student) (int, error) {
    query := `INSERT INTO students (name, class_number) VALUES ($1, $2) RETURNING id`
    
    var id int
    err := db.DB.QueryRow(query, student.Name, student.ClassNumber).Scan(&id)
    if err != nil {
        log.Printf("Error inserting student: %v", err)
        return 0, err
    }

    return id, nil
}
