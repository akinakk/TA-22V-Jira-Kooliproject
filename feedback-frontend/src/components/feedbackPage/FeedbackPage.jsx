import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import FeedbackCard from './FeedbackCard';
import SearchBar from './SearchBar';

const FeedbackPage = () => {
    const [group, setGroup] = useState('All');
    const [course, setCourse] = useState('All');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

    const feedbacks = [
        {
            name: 'Sergei Astahov',
            course: 'Math',
            group: 'TA-22E',
            feedback: {
                teacher: 5,
                work: 1,
                interest: 4,
                difficulty: 3,
                usefulness: 2,
                average: 3,
                comment: 'Suurepärane kursus, õppisin palju!',
                date: '2024-10-08',
            },
        },
        {
            name: 'Artemi Baburin',
            course: 'Eesti Keel',
            group: 'TA-22V',
            feedback: {
                teacher: 5,
                work: 1,
                interest: 4,
                difficulty: 3,
                usefulness: 2,
                average: 3,
                comment: 'Suurepärane kursus, õppisin palju!',
                date: '2024-10-08',
            },
        },
    ];

    const handleSearch = () => {
        let result = feedbacks;

        if (group !== 'All') {
            result = result.filter((item) => item.group === group);
        }
        if (course !== 'All') {
            result = result.filter((item) => item.course === course);
        }

        setFilteredFeedbacks(result);
    };

    return (
        <Box sx={{ backgroundColor: '#add8e6', height: '100vh', padding: 4 }}>
            <SearchBar
                group={group}
                course={course}
                onGroupChange={setGroup}
                onCourseChange={setCourse}
                onSearch={handleSearch}
            />

            <Grid container spacing={4}>
                {(filteredFeedbacks.length ? filteredFeedbacks : feedbacks).map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <FeedbackCard name={item.name} course={item.course} feedback={item.feedback} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeedbackPage;
