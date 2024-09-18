import React from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button } from '@mui/material';

const FeedbackForm = () => {
    const [subject, setSubject] = React.useState('');

    const handleChange = (event) => {
        setSubject(event.target.value);
    };

    return (
        <Box sx={{ bgcolor: '#add8e6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ bgcolor: 'white', borderRadius: '8px', padding: '32px', width: '600px' }}>
                <Typography variant="h5" align="center" gutterBottom>TAGASISIDE</Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>JÄTTA OMA TAGASISIDET</Typography>

                {/* Dropdown for course selection */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Ainenimi</InputLabel>
                    <Select value={subject} onChange={handleChange}>
                        <MenuItem value=""><em>Vali</em></MenuItem>
                        <MenuItem value={10}>Serveripoolsed tehnoloogiad veebirakenduste loomiseks</MenuItem>
                        <MenuItem value={20}>Hajusrakenduste alused II</MenuItem>
                        <MenuItem value={30}>Tarkvaraarenduse meetodid</MenuItem>
                    </Select>
                </FormControl>

                {/* Feedback Questions */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}><Typography>HINNE ÕPETAJAT</Typography></Grid>
                    <Grid item xs={6}>
                        <RadioGroup row>
                            {[1, 2, 3, 4, 5].map(value => (
                                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                            ))}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={6}><Typography>HINNE TÖÖD (mida antakse)</Typography></Grid>
                    <Grid item xs={6}>
                        <RadioGroup row>
                            {[1, 2, 3, 4, 5].map(value => (
                                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                            ))}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={6}><Typography>KUI HUVITAV TUNNID ON?</Typography></Grid>
                    <Grid item xs={6}>
                        <RadioGroup row>
                            {[1, 2, 3, 4, 5].map(value => (
                                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                            ))}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={6}><Typography>KUI RASKE TÖÖ ON?</Typography></Grid>
                    <Grid item xs={6}>
                        <RadioGroup row>
                            {[1, 2, 3, 4, 5].map(value => (
                                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                            ))}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={6}><Typography>KUI KASULIK ON TEILE ANTUD TÖÖ?</Typography></Grid>
                    <Grid item xs={6}>
                        <RadioGroup row>
                            {[1, 2, 3, 4, 5].map(value => (
                                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                            ))}
                        </RadioGroup>
                    </Grid>
                </Grid>

                {/* Additional feedback text area */}
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Kirjuta, mida me võime paremaks teha (optional)"
                    variant="outlined"
                    sx={{ mb: 3 }}
                />

                {/* Submit button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{ bgcolor: '#ccff99' }}>✔</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default FeedbackForm;
