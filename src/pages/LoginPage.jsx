import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault()
    await axios.post('/api/auth', formData)
      .then((res) => {
        if (res.data.success) {
          navigate('/me')
        }
      })
  }

  return (
    <>
      <h1>Log In</h1>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}
