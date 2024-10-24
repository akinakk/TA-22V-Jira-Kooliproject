package services

import (
	"database/sql"
	"feedback-backend/db"
	"feedback-backend/models"
	"fmt"
	"log"
	"time"
)

func CreateFeedback(feedback models.Feedback) error {
	query := `
		INSERT INTO feedback (student_id, course_id, teacher_rating, job_rating, interest_rating, difficulty_rating, usefulness_rating, comment, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`

	_, err := db.DB.Exec(query, feedback.StudentID, feedback.CourseID, feedback.TeacherRating, feedback.JobRating, feedback.InterestRating, feedback.DifficultyRating, feedback.UsefulnessRating, feedback.Comment, time.Now())
	if err != nil {
		log.Printf("Error inserting feedback: %v", err)
		return err
	}

	return nil
}

func FetchFeedbacks() ([]models.Feedback, error) {
	query := `SELECT id, student_id, course_id, teacher_rating, job_rating, interest_rating, difficulty_rating, usefulness_rating, comment, created_at FROM feedback`

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error fetching feedbacks: %v", err)
		return nil, err
	}
	defer rows.Close()

	var feedbacks []models.Feedback
	for rows.Next() {
		var feedback models.Feedback
		if err := rows.Scan(&feedback.ID, &feedback.StudentID, &feedback.CourseID, &feedback.TeacherRating, &feedback.JobRating, &feedback.InterestRating, &feedback.DifficultyRating, &feedback.UsefulnessRating, &feedback.Comment, &feedback.CreatedAt); err != nil {
			log.Printf("Error scanning feedback: %v", err)
			return nil, err
		}
		feedbacks = append(feedbacks, feedback)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Rows error: %v", err)
		return nil, err
	}

	return feedbacks, nil
}

func FetchFeedbackByID(id int) (*models.Feedback, error) {
	query := `SELECT id, student_id, course_id, teacher_rating, job_rating, interest_rating, difficulty_rating, usefulness_rating, comment, created_at FROM feedback WHERE id = $1`

	row := db.DB.QueryRow(query, id)

	var feedback models.Feedback
	err := row.Scan(&feedback.ID, &feedback.StudentID, &feedback.CourseID, &feedback.TeacherRating, &feedback.JobRating, &feedback.InterestRating, &feedback.DifficultyRating, &feedback.UsefulnessRating, &feedback.Comment, &feedback.CreatedAt)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("no feedback found with ID %d", id)
	} else if err != nil {
		log.Printf("Error fetching feedback by ID: %v", err)
		return nil, err
	}

	return &feedback, nil
}

func DeleteFeedbackByID(id int) (*models.Feedback, error) {
	query := `DELETE FROM feedback WHERE id = $1 RETURNING id, student_id, course_id, teacher_rating, job_rating, interest_rating, difficulty_rating, usefulness_rating, comment, created_at`

	var feedback models.Feedback
	err := db.DB.QueryRow(query, id).Scan(&feedback.ID, &feedback.StudentID, &feedback.CourseID, &feedback.TeacherRating, &feedback.JobRating, &feedback.InterestRating, &feedback.DifficultyRating, &feedback.UsefulnessRating, &feedback.Comment, &feedback.CreatedAt)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("feedback not found")
	} else if err != nil {
		log.Printf("Error deleting feedback by ID: %v", err)
		return nil, err
	}

	return &feedback, nil
}
