import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
    name:string;    
}
const useAuthApi = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);    
    const handleAuth=async(formData:AuthFormData,isLogin:boolean)=>{
        setError(null);
        setLoading(true);
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }
        try {
            const url = isLogin ? "http://localhost:8000/api/login" : "http://localhost:8000/api/register";
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name:formData.name, email: formData.email, password: formData.password }),
            });
      
            const data = await response.json();
            console.log(data);
            setLoading(false);
      
            if (!response.ok) throw new Error(data.detail || "Something went wrong");
            //set token in local storage
            if (data?.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              navigate("/home");
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
          }
          finally{
            setLoading(false);
          }
    }
  return {handleAuth,loading,error}
}

export default useAuthApi
