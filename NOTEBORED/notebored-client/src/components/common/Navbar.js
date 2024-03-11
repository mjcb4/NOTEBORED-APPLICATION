import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="navbar">

                <h2>[</h2>
                <Link to="/"><h3>HOMEPAGE</h3></Link>
                <h2>]</h2>

                <h2>[</h2>
                <Link to="/login"><h3>LOGIN</h3></Link>
                <h2>]</h2>

                <h2>[</h2>
                <Link to="/settings"><h3>SETTINGS</h3></Link>
                <h2>]</h2>
            </div>
        </nav>
    )
}

export default Navbar