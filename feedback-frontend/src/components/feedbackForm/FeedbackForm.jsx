import React from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

// Universaalsed stiilid
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

// Komponent vigade kuvamiseks
const ErrorMessage = ({ message }) => (
  <Typography color="error">{message}</Typography>
);

// Universaalne komponent raadionuppude jaoks
const RatingField = ({ control, name, label, error }) => (
  <>
    <Grid item xs={3}>
      <Typography>{label}</Typography>
    </Grid>
    <Grid item xs={9}>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Hinda!" }}
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nimi: "",
      rühm: "",
      subject: "",
      teacherRating: "",
      workRating: "",
      interestLevel: "",
      difficultyLevel: "",
      usefulness: "",
      feedback: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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
          TAGASISIDE
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          JÄTTA OMA TAGASISIDET
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nimi"
            control={control}
            rules={{ required: "Kirjuta oma nimi!" }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={1}
                  placeholder="Nimi"
                  sx={{ mb: 1 }}
                />
                {errors.nimi && <ErrorMessage message={errors.nimi.message} />}
              </>
            )}
          />

          <Controller
            name="rühm"
            control={control}
            rules={{ required: "Kirjuta oma rühm!" }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={1}
                  placeholder="Rühm"
                  sx={{ mb: 1 }} 
                />
                {errors.rühm && <ErrorMessage message={errors.rühm.message} />}
              </>
            )}
          />

          <FormControl fullWidth sx={{ mb: 3}}>
            <InputLabel sx={{ textAlign: "center" }} >
              Ainenimi
            </InputLabel>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Vali aine" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Ainenimi"
                  sx={{ height: "56px", padding: "10px" }}
                >
                  <MenuItem value="">
                    <em>Vali</em>
                  </MenuItem>
                  <MenuItem value={10}>Andmebaasid II</MenuItem>
                  <MenuItem value={20}>Hajusrakenduste alused II</MenuItem>
                  <MenuItem value={30}>Küberturbe alused</MenuItem>
                  <MenuItem value={50}>
                    Riistvaralähedane programmeerimine
                  </MenuItem>
                  <MenuItem value={60}>
                    Serveripoolsed tehnoloogiad veebirakenduste loomiseks
                  </MenuItem>
                  <MenuItem value={70}>Tarkvaraarenduse meetodid</MenuItem>
                  <MenuItem value={80}>
                    Testimise alused ja testimisplaan
                  </MenuItem>
                </Select>
              )}
            />
            {errors.subject && (
              <ErrorMessage message={errors.subject.message} />
            )}
          </FormControl>

          {/* Punktiväljad */}
          <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
            {[
              { label: "HINNE ÕPETAJAT", name: "teacherRating" },
              { label: "HINNE TÖÖD (mida antakse)", name: "workRating" },
              { label: "KUI HUVITAV TUNNID ON?", name: "interestLevel" },
              { label: "KUI RASKE ТÖÖ ON?", name: "difficultyLevel" },
              { label: "KUI KASULIK ON TEILE ANTUD ТÖÖ?", name: "usefulness" },
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

          {/* See Tagasiside tekstikast */}
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

          {/* See on Saada nupp */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={formStyles.submitButton}
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
              </svg>
            </Button>
          </Box>
        </form>
      </Box>

      {/* Teade pärast vormi esitamist */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Vorm on edukalt esitatud!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackForm;
