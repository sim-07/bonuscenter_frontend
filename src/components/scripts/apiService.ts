const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiService = async (route: string, endpoint: string, payload?: object) => {
    try {
        const response = await fetch(`${apiUrl}/${route}/${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error in ${endpoint}`);
        }
    } catch (error) {
        console.error(`Error in ${endpoint}: `, error);
        throw error;
    }
};

export default apiService;