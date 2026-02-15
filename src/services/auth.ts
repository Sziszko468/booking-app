export const login = async (email: string, password: string) => {
  // Fake validation
  if (email === "admin@test.com" && password === "123456") {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "fake-jwt-token");
    }
    return true;
  }

  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};
