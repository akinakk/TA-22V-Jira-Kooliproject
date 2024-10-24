import React from 'react';
import { Paper, Typography, Box, Button, Stack } from '@mui/material';
import { deleteData } from '../../services/api';

const FeedbackCard = ({ feedback, onDelete }) => {
  const averageRating = (
    feedback.teacher_rating +
    feedback.job_rating +
    feedback.interest_rating +
    feedback.difficulty_rating +
    feedback.usefulness_rating
  ) / 5;

  const handleDelete = async () => {
    try {
      await deleteData(feedback.id);
      if (onDelete) {
        onDelete(feedback.id);
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
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
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: 'primary.main', backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}
        >
          Keskmine hinne: {averageRating.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          Esitatud: {new Date(feedback.created_at).toLocaleDateString()}
        </Typography>
        <Stack direction="row-reverse" spacing={2}>
          <Button variant="contained" color="success">
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default FeedbackCard;
