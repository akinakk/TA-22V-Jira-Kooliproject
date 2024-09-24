package services

import (
	"feedback-backend/db"
	"feedback-backend/models"
	"log"
)

func GetCourses() ([]models.Course, error) {
	query := `SELECT id, course_name FROM courses`
	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error fetching courses: %v", err)
		return nil, err
	}
	defer rows.Close()

	var courses []models.Course
	for rows.Next() {
		var course models.Course
		if err := rows.Scan(&course.ID, &course.CourseName); err != nil {
			log.Printf("Error scanning course: %v", err)
			return nil, err
		}
		courses = append(courses, course)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Rows error: %v", err)
		return nil, err
	}

	return courses, nil
}

func CreateCourse(course models.Course) error {
	query := "INSERT INTO courses (course_name) VALUES ($1)"
	_, err := db.DB.Exec(query, course.CourseName)
	if err != nil {
		log.Printf("Error inserting student: %v", err)
		return err
	}

	return nil
}
