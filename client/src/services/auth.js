// to redirect the user to the /auth/google URL when the login function is called.
export const login = () => (window.location.href = '/auth/google');
export const logout = () => (window.location.href = '/api/logout');
