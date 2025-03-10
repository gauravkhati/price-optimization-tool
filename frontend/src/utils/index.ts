export const isTokenValid = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;
  
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      return exp * 1000 > Date.now(); 
    } catch {
      return false; 
    }
  };