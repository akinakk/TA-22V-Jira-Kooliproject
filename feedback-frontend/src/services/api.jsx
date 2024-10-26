export const submitData = async (data, path) => {
    try {
        const response = await fetch(`http://localhost:8080/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error("Error submitting data:", error);
        throw error;
    }
};

export const getData = async (path) => {
    try {
        const response = await fetch(`http://localhost:8080/${path}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/submit-feedback/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
};

export const updateData = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:8080/submit-feedback/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
};
