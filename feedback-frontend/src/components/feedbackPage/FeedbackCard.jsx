import React from 'react';
import { Paper, Typography } from '@mui/material';

const FeedbackCard = ({ name, course, feedback }) => (
  <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
    <Typography variant="h6" sx={{ color: 'green' }}>
      {name} / {course}
    </Typography>
    <Typography variant="body1">Õpetaja: {feedback.teacher}</Typography>
    <Typography variant="body1">Hinne tööd: {feedback.work}</Typography>
    <Typography variant="body1">Huvi: {feedback.interest}</Typography>
    <Typography variant="body1">Raskusaste: {feedback.difficulty}</Typography>
    <Typography variant="body1">Kasutlikkus: {feedback.usefulness}</Typography>
    <Typography variant="body1">Keskmine hind: {feedback.average}</Typography>
    <Typography variant="body1">Kommentaar: {feedback.comment}</Typography>
    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
      Esitatud: {feedback.date}
    </Typography>
  </Paper>
);

export default FeedbackCard;
