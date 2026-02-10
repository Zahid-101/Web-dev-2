import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Header = () => {
    const { theme, toggleTheme } = useContext(DataContext);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold font-eco-font text-harvest-green hover:opacity-80 transition-opacity">
                    Urban Harvest Hub
                </Link>
                <nav className="flex items-center gap-6">
                    <ul className="hidden md:flex items-center gap-6">
                        <li><NavLink to="/" className={({ isActive }) => `font-medium hover:text-harvest-green transition-colors ${isActive ? 'text-harvest-green' : 'text-eco-charcoal'}`}>Home</NavLink></li>
                        <li><NavLink to="/categories" className={({ isActive }) => `font-medium hover:text-harvest-green transition-colors ${isActive ? 'text-harvest-green' : 'text-eco-charcoal'}`}>Categories</NavLink></li>
                        <li><NavLink to="/booking" className={({ isActive }) => `font-medium hover:text-harvest-green transition-colors ${isActive ? 'text-harvest-green' : 'text-eco-charcoal'}`}>Booking</NavLink></li>
                    </ul>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-harvest-green"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? '🌞' : '🌙'}
                    </button>
                    {/* Mobile Menu Button could go here */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
