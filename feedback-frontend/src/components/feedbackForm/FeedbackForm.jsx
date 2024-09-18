import React from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const FeedbackForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            subject: '',
            teacherRating: '',
            workRating: '',
            interestLevel: '',
            difficultyLevel: '',
            usefulness: '',
            feedback: ''
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Box sx={{ bgcolor: '#add8e6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ bgcolor: 'white', borderRadius: '8px', padding: '32px', width: '600px' }}>
                <Typography variant="h5" align="center" gutterBottom>TAGASISIDE</Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>JÄTTA OMA TAGASISIDET</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Ainenimi</InputLabel>
                        <Controller
                            name="subject"
                            control={control}
                            rules={{ required: 'Vali aine' }}
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value=""><em>Vali</em></MenuItem>
                                    <MenuItem value={10}>Serveripoolsed tehnoloogiad veebirakenduste loomiseks</MenuItem>
                                    <MenuItem value={20}>Hajusrakenduste alused II</MenuItem>
                                    <MenuItem value={30}>Tarkvaraarenduse meetodid</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.subject && <Typography color="error">{errors.subject.message}</Typography>}
                    </FormControl>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {[
                            { label: 'HINNE ÕPETAJAT', name: 'teacherRating' },
                            { label: 'HINNE TÖÖD (mida antakse)', name: 'workRating' },
                            { label: 'KUI HUVITAV TUNNID ON?', name: 'interestLevel' },
                            { label: 'KUI RASKE TÖÖ ON?', name: 'difficultyLevel' },
                            { label: 'KUI KASULIK ON TEILE ANTUD TÖÖ?', name: 'usefulness' }
                        ].map(({ label, name }) => (
                            <React.Fragment key={name}>
                                <Grid item xs={6}><Typography>{label}</Typography></Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name={name}
                                        control={control}
                                        rules={{ required: 'Hinda!' }}
                                        render={({ field }) => (
                                            <RadioGroup row {...field}>
                                                {[1, 2, 3, 4, 5].map(value => (
                                                    <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                                                ))}
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors[name] && <Typography color="error">{errors[name].message}</Typography>}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>

                    <Controller
                        name="feedback"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Kirjuta, mida me võime paremaks teha (optional)"
                                variant="outlined"
                                sx={{ mb: 3 }}
                            />
                        )}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" sx={{ bgcolor: '#ccff99' }} type="submit">✔</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default FeedbackForm;
