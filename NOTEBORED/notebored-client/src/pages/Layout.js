import Navbar from '../components/common/Navbar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className="App">
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout