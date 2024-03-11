import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    const handleGoToLogin = () => {
        navigate('/login')
    }

    const handleGoToSignup = () => {
        navigate('/signup')
    }

    const handleDemo = () => {
        navigate('/notemap')
    }

    return (
        <div className="home-page container">
            <h1>NOTEBORED HOMEPAGE</h1>
            <button onClick={handleGoToLogin}>Login to Notebored</button>
            <button onClick={handleGoToSignup}>Signup to Notebored</button>
            <button onClick={handleDemo}>Notebored Demo</button>
        </div>
    )
}

export default HomePage