import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { submitData } from "../../services/api";
import useAppStore from "../useAppStore";

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

const NamePage = () => {
    const { setStep, setFormData, setStudentId } = useAppStore();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            group: "",
        },
    });

    const handleNameSubmit = async (data) => {
        setFormData(data);
        try {
            const response = await submitData(data, "students");
            const studentId = response.id;
            setStudentId(studentId);
            setStep(2);
        } catch (error) {
            console.error("Error creating student: ", error);
        }
    };

    const handleFormSubmit = (data) => {
        const studentData = {
            name: data.name,
            class_number: data.group,
        };
        handleNameSubmit(studentData);
    };

    return (
        <Box sx={formStyles.pageContainer}>
            <Box sx={formStyles.formContainer}>
                <Typography variant="h5" align="center" gutterBottom>
                    Enter Your Name and Group
                </Typography>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Please enter your name!" }}
                        render={({ field }) => (
                            <>
                                <TextField {...field} fullWidth placeholder="Name" sx={{ mb: 1 }} />
                                {errors.name && <Typography color="error">{errors.name.message}</Typography>}
                            </>
                        )}
                    />

                    <Controller
                        name="group"
                        control={control}
                        rules={{ required: "Please enter your group!" }}
                        render={({ field }) => (
                            <>
                                <TextField {...field} fullWidth placeholder="Group" sx={{ mb: 1 }} />
                                {errors.group && <Typography color="error">{errors.group.message}</Typography>}
                            </>
                        )}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" sx={formStyles.submitButton} type="submit">
                            Continue
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default NamePage;
