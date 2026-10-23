
export const saveToken = (token) => {
    localStorage.setItem("access_token", token.access);
    localStorage.setItem("refresh_token", token.refresh);
};

export const clearToken = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

export const authFetch = (url, options = {}) => {
    const token = getAccessToken();

    const headers = new Headers(options.headers || {});

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
        ...options,
        headers,
    });
};
