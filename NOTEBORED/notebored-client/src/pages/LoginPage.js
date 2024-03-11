import { useNavigate } from 'react-router-dom'

// COMPONENTS
import LoginForm from '../components/auth/LoginForm'

const LoginPage = () => {
    const navigate = useNavigate()

    const handleLoginSuccess = () => {
        navigate('/notemap')
    }

    return (
        <section className="login-page container">
            <h1>ACCOUNT LOGIN</h1>
            <div className="auth-form">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            <p>
                Don't Have Account?<br />
                <span className="line">
                    <a href="/signup">[SIGNUP]</a>
                </span>
            </p>
            </div>


        </section>
    )
}

export default LoginPage