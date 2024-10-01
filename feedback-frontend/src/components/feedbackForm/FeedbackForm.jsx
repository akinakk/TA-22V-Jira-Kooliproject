import React, { useEffect, useState } from "react";
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getData } from "../../services/api";

const formStyles = {
  formContainer: {
    bgcolor: "white",
    borderRadius: "20px",
    padding: "32px",
    width: "600px",
  },
  pageContainer: {
    bgcolor: "#add8e6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    bgcolor: "#A0F353",
  },
};

const ErrorMessage = ({ message }) => (
  <Typography color="error">{message}</Typography>
);

const RatingField = ({ control, name, label, error }) => (
  <>
    <Grid item xs={3}>
      <Typography>{label}</Typography>
    </Grid>
    <Grid item xs={9}>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Please give a rating!" }}
        render={({ field }) => (
          <RadioGroup row {...field}>
            {[1, 2, 3, 4, 5].map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
        )}
      />
      {error && <ErrorMessage message={error.message} />}
    </Grid>
  </>
);

const FeedbackForm = () => {
  const [courses, setCourses] = useState([]);
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      subject: "",
      teacherRating: "",
      workRating: "",
      interestLevel: "",
      difficultyLevel: "",
      usefulness: "",
      feedback: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getData("courses");
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setOpenSnackbar(true);
    reset();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={formStyles.pageContainer}>
      <Box sx={formStyles.formContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          FEEDBACK
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          LEAVE YOUR FEEDBACK
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ textAlign: "center" }}>Course Name</InputLabel>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Please select a course" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Course Name"
                  sx={{ height: "56px", padding: "10px" }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.course_name}>
                      {course.course_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.subject && <ErrorMessage message={errors.subject.message} />}
          </FormControl>

          <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
            {[
              { label: "TEACHER RATING", name: "teacherRating" },
              { label: "WORK RATING (given work)", name: "workRating" },
              { label: "INTEREST LEVEL OF THE CLASS?", name: "interestLevel" },
              { label: "DIFFICULTY OF THE WORK?", name: "difficultyLevel" },
              { label: "USEFULNESS OF THE WORK?", name: "usefulness" },
            ].map(({ label, name }) => (
              <RatingField
                key={name}
                control={control}
                name={name}
                label={label}
                error={errors[name]}
              />
            ))}
          </Grid>

          <Controller
            name="feedback"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Your feedback"
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
          />

          <Button variant="contained" sx={formStyles.submitButton} type="submit">
            Submit Feedback
          </Button>
        </form>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Feedback submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default FeedbackForm;
