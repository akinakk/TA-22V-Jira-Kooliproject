import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

const EditFeedbackForm = ({ feedback, open, onClose, onSave }) => {
    const [updatedFeedback, setUpdatedFeedback] = useState(feedback);

    const handleIncrease = (name) => {
        setUpdatedFeedback((prev) => {
            const newValue = Math.min(prev[name] + 1, 5);
            return { ...prev, [name]: newValue };
        });
    };

    const handleDecrease = (name) => {
        setUpdatedFeedback((prev) => {
            const newValue = Math.max(prev[name] - 1, 1);
            return { ...prev, [name]: newValue };
        });
    };

    const handleSave = () => {
        onSave(updatedFeedback);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Feedback</DialogTitle>
            <DialogContent>
                <Stack spacing={2} alignItems="center">
                    {['teacher_rating', 'job_rating', 'interest_rating', 'difficulty_rating', 'usefulness_rating'].map((rating) => (
                        <div key={rating} style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                onClick={() => handleDecrease(rating)}
                                variant="contained"
                                size="large"
                                style={{ minWidth: '40px' }}
                            >
                                -
                            </Button>
                            <span style={{ margin: '0 20px', fontSize: '20px' }}>{updatedFeedback[rating]}</span>
                            <Button
                                onClick={() => handleIncrease(rating)}
                                variant="contained"
                                size="large"
                                style={{ minWidth: '40px' }}
                            >
                                +
                            </Button>
                        </div>
                    ))}
                    <TextField
                        label="Comment"
                        name="comment"
                        multiline
                        rows={3}
                        value={updatedFeedback.comment}
                        onChange={(e) => setUpdatedFeedback((prev) => ({ ...prev, comment: e.target.value }))}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditFeedbackForm;
