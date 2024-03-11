import { Link } from 'react-router-dom'

const MissingPage = () => {
    return (
        <main className='missing-page'>
            <h2>Page Not Found</h2>
            <p>Whoops, the URL entered doesn't go anywhere...</p>
            <p>
                <Link to='/'>Click Here And Return Back To The Homepage!</Link>
            </p>
        </main>
    )
}

export default MissingPage