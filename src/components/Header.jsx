import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="main-header">
            <div className="container">
                <Link to="/" className="logo">
                    Urban Harvest Hub
                </Link>
                <nav className="main-nav">
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                        <li><NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>Categories</NavLink></li>
                        <li><NavLink to="/booking" className={({ isActive }) => isActive ? 'active' : ''}>Booking</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
