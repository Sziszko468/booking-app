export const login = async (email: string, password: string) => {
  console.log("🔑 Login attempt:", { email, password: "***" });
  
  // Fake validation
  if (email === "admin@test.com" && password === "123456") {
    console.log("✅ Credentials valid");
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "fake-jwt-token");
      console.log("✅ Token saved to localStorage:", localStorage.getItem("token"));
    }
    return true;
  }

  console.log("❌ Invalid credentials");
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
