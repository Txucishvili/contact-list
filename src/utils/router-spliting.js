export const loadRoutes = async (path) => {
    return Promise.resolve(import(path));
}

export const getAppRoutes = async (path) => {
    return Promise.resolve(import("@/router/dashboard.js"));
}
export const getAuthRoutes = async (path) => {
    return Promise.resolve(import("@/router/auth"));
}