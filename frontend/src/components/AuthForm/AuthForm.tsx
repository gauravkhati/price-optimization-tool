import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";
import useAuthApi from "./hooks/useAuthApi";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name:string;
}

const AuthForm: React.FC = () => {
  const {handleAuth,loading,error}=useAuthApi();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", confirmPassword: "" ,name:""});


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleAuth(formData,isLogin);
  };

  useEffect(()=>{
     // If user is already logged in, redirect to /home
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

        {!isLogin && (
          <div className={styles.inputContainer}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>
        )}

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
