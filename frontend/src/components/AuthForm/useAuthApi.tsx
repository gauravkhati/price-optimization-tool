import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
}

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (formData: AuthFormData, isLogin: boolean) => {
        setError(null);
        setLoading(true);

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const url = isLogin
                ? "http://localhost:8000/api/login"
                : "http://localhost:8000/api/register";

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "temp", email: formData.email, password: formData.password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || "Something went wrong");

            if (data?.access_token) {
                localStorage.setItem("accessToken", data.access_token);
                navigate("/home");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { handleAuth, loading, error };
};

export default useAuth;
