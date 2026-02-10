import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Header = () => {
    const { theme, toggleTheme } = useContext(DataContext);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-eco-charcoal-900/90 backdrop-blur-md border-b border-gray-200 dark:border-eco-charcoal-700 transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold font-heading text-harvest-green-700 dark:text-harvest-green-400 hover:opacity-80 transition-opacity">
                    Urban Harvest Hub
                </Link>
                <nav className="flex items-center gap-6">
                    <ul className="hidden md:flex items-center gap-6">
                        <li><NavLink to="/" className={({ isActive }) => `font-medium hover:text-harvest-green-600 dark:hover:text-harvest-green-300 transition-colors ${isActive ? 'text-harvest-green-600 dark:text-harvest-green-400' : 'text-eco-charcoal-600 dark:text-gray-300'}`}>Home</NavLink></li>
                        <li><NavLink to="/categories" className={({ isActive }) => `font-medium hover:text-harvest-green-600 dark:hover:text-harvest-green-300 transition-colors ${isActive ? 'text-harvest-green-600 dark:text-harvest-green-400' : 'text-eco-charcoal-600 dark:text-gray-300'}`}>Categories</NavLink></li>
                        <li><NavLink to="/booking" className={({ isActive }) => `font-medium hover:text-harvest-green-600 dark:hover:text-harvest-green-300 transition-colors ${isActive ? 'text-harvest-green-600 dark:text-harvest-green-400' : 'text-eco-charcoal-600 dark:text-gray-300'}`}>Booking</NavLink></li>
                    </ul>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-eco-charcoal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-harvest-green-500"
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
