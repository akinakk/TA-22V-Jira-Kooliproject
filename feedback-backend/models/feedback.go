package models

import "time"

type Feedback struct {
	ID               int       `json:"id"`
	StudentID        int       `json:"student_id" validate:"required"`
	CourseID         int       `json:"course_id" validate:"required"`
	TeacherRating    int       `json:"teacher_rating" validate:"required,min=1,max=5"`
	JobRating        int       `json:"job_rating" validate:"required,min=1,max=5"`
	InterestRating   int       `json:"interest_rating" validate:"required,min=1,max=5"`
	DifficultyRating int       `json:"difficulty_rating" validate:"required,min=1,max=5"`
	UsefulnessRating int       `json:"usefulness_rating" validate:"required,min=1,max=5"`
	Comment          string    `json:"comment"`
	CreatedAt        time.Time `json:"created_at"`
}
