import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const SearchBar = ({ group, course, onGroupChange, onCourseChange, onSearch }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
                padding: 3,
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <TextField
                label="RÜHM"
                select
                fullWidth
                value={group}
                onChange={(e) => onGroupChange(e.target.value)}
                sx={{ marginRight: 2 }}
                InputProps={{
                    sx: {
                        borderRadius: '5px',
                        backgroundColor: '#F0F0F0',
                    },
                }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="TA-22E">TA-22E</MenuItem>
                <MenuItem value="TA-22V">TA-22V</MenuItem>
            </TextField>

            <TextField
                label="KURSUS"
                select
                fullWidth
                value={course}
                onChange={(e) => onCourseChange(e.target.value)}
                InputProps={{
                    sx: {
                        borderRadius: '5px',
                        backgroundColor: '#F0F0F0',
                    },
                }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Eesti Keel">Eesti Keel</MenuItem>
            </TextField>

            <Button
                variant="contained"
                onClick={onSearch}
                sx={{
                    backgroundColor: '#6BCA34',
                    color: 'white',
                    padding: '10px 20px',
                    marginLeft: 2,
                    borderRadius: '5px',
                    '&:hover': {
                        backgroundColor: '#5BB02E',
                    },
                }}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
