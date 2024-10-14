import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { getData } from '../../services/api';
import FeedbackCard from './FeedbackCard';
import SearchBar from './SearchBar';

const FeedbackPage = () => {
    const [group, setGroup] = useState('All');
    const [course, setCourse] = useState('All');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const feedbackData = await getData("submit-feedback");
                setFeedbacks(feedbackData);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        };

        const fetchStudents = async () => {
            try {
                const studentData = await getData("students");
                setStudents(studentData);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        const fetchCourses = async () => {
            try {
                const courseData = await getData("courses");
                setCourses(courseData);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchFeedbacks();
        fetchStudents();
        fetchCourses();
    }, []);

    const handleSearch = () => {
        let result = feedbacks;

        if (group !== 'All') {
            result = result.filter((item) => {
                const student = students.find(s => s.id === item.student_id);
                return student ? student.class_number === group : false;
            });
        }
        if (course !== 'All') {
            result = result.filter((item) => item.course_id === course);
        }

        setFilteredFeedbacks(result);
    };

    const enrichFeedbacks = (feedbacks) => {
        return feedbacks.map(feedback => {
            const student = students.find(s => s.id === feedback.student_id) || {};
            const courseItem = courses.find(c => c.id === feedback.course_id) || {};

            return {
                ...feedback,
                studentInfo: {
                    name: student.name || 'Unknown',
                    class_number: student.class_number || 'Unknown'
                },
                courseInfo: {
                    course_name: courseItem.course_name || 'Unknown'
                }
            };
        });
    };

    return (
        <Box sx={{ backgroundColor: '#add8e6', padding: 4 }}>
            <SearchBar
                group={group}
                course={course}
                onGroupChange={setGroup}
                onCourseChange={setCourse}
                onSearch={handleSearch}
            />

            <Grid container spacing={4}>
                {(filteredFeedbacks.length ? enrichFeedbacks(filteredFeedbacks) : enrichFeedbacks(feedbacks)).map((item) => (
                    <Grid item xs={12} md={6} key={item.id}>
                        <FeedbackCard feedback={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeedbackPage;
