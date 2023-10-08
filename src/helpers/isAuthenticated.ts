export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token-shoppinglist");
    if (token) {
        return true;
    } else {
        return false;
    }
};