let cachedCsrfToken: string = '';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCsrf = async (): Promise<string> => {
    if (cachedCsrfToken) return cachedCsrfToken;

    const res = await fetch(`${apiUrl}/csrf_token`, {
        credentials: 'include',
    });
    const data = await res.json();
    cachedCsrfToken = data.csrfToken;
    return cachedCsrfToken;
};
