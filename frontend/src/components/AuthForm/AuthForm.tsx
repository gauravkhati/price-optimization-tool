import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
        body: JSON.stringify({ 'name':'temp',email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (!response.ok) throw new Error(data.detail || "Something went wrong");
      //set token in local storage
      if (data?.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        console.log('data.token',data.access_token);
        navigate("/home");
      }
      setIsLogin(true); // Switch to login mode after signup
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };
  useEffect(()=>{
     // If user is already logged in, redirect to /home
     console.log('localStorage.getItem(accessToken)',localStorage.getItem('accessToken'));
    if(localStorage.getItem('accessToken')){
      navigate('/home');
    }
  },[navigate])

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <div className={styles.inputContainer}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
        </div>

        <div className={styles.inputContainer}>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
        </div>

        {!isLogin && (
          <div className={styles.inputContainer}>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
          </div>
        )}

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" disabled={loading}>{loading ? "Processing..." : isLogin ? "Login" : "Signup"}</button>

        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? " Signup" : " Login"}</span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
