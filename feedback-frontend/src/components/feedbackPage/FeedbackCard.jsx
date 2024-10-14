import React from 'react';
import { Paper, Typography } from '@mui/material';

const FeedbackCard = ({ feedback }) => (
  <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
    <Typography variant="body1">Nimi: {feedback.studentInfo.name}</Typography>
    <Typography variant="body1">Rühm: {feedback.studentInfo.class_number}</Typography>
    <Typography variant="body1">Kursus: {feedback.courseInfo.course_name}</Typography>
    <Typography variant="body1">Õpetaja: {feedback.teacher_rating}</Typography>
    <Typography variant="body1">Hinne tööd: {feedback.job_rating}</Typography>
    <Typography variant="body1">Huvi: {feedback.interest_rating}</Typography>
    <Typography variant="body1">Raskusaste: {feedback.difficulty_rating}</Typography>
    <Typography variant="body1">Kasutlikkus: {feedback.usefulness_rating}</Typography>
    <Typography variant="body1">Kommentaar: {feedback.comment}</Typography>
    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
      Esitatud: {new Date(feedback.created_at).toLocaleDateString()}
    </Typography>
  </Paper>
);

export default FeedbackCard;
