import { useNavigate } from 'react-router-dom'

// COMPONENTS
import SignupForm from '../components/auth/SignupForm'

const SignupPage = () => {
    const navigate = useNavigate()

    const handleSignupSuccess = () => {
        navigate('/notemap')
    }

    return (
        <section className="signup-page container">
            <h1>ACCOUNT REGISTRATION</h1>
            <div className="auth-form">
                <SignupForm onSignupSuccess={handleSignupSuccess} />
            </div>
        </section>
    )
}

export default SignupPage