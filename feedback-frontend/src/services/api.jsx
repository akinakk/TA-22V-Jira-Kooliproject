export const submitStudentData = async (studentData) => {
    try {
        const response = await fetch("http://localhost:8080/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentData),
        });
        return response.json();
    } catch (error) {
        console.error("Error submitting student data:", error);
        throw error;
    }
};
