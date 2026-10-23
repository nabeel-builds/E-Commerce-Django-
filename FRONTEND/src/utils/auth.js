
export const authFetch = (url, options = {}) => {
    const headers = new Headers(options.headers || {});
    const token = getAccessToken();

    console.log("Request URL:", url);
    console.log("Token exists:", Boolean(token));

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    console.log(
        "Authorization header added:",
        headers.has("Authorization")
    );

    return fetch(url, {
        ...options,
        headers,
    });
};
