package services

import (
	"feedback-backend/models"
)

var courses []models.Course

func GetCourses() []models.Course {
	return courses
}

func CreateCourse(course models.Course) {
    courses = append(courses, course)
}
