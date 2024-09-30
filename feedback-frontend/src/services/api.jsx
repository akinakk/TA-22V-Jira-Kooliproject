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
