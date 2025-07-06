import { getCsrf } from "./csrf";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiService = async (route: string, endpoint: string, payload?: object) => {
    try {
        const csrfToken = await getCsrf();

        const response = await fetch(`${apiUrl}/${route}/${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            return { error: data.error || 'Errore generico', status: response.status };
        }
    } catch (error) {
        console.error(`Error in ${endpoint}: `, error);
        throw error;
    }
};

export default apiService;
