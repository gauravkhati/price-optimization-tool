import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div >
      <h1 >404</h1>
      <p >Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};


export default ErrorPage;
