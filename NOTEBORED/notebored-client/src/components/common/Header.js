import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="header">
                <h1>[</h1>
                <Link to="/notemap"><h2>NOTEBOARD</h2></Link>
                <h1>]</h1>
            </div>
        </header>
    )
}

export default Header