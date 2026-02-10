import { createContext, useState, useEffect, useMemo } from 'react';
import { items as staticItems, categories as staticCategories, highlights } from '../data/mockData';
import PropTypes from 'prop-types';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Simulate fetching static data with a delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Fetch Public Holidays
                // Using a fallback if the API fails or is unavailable
                let holidays = [];
                try {
                    const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2026/US');
                    if (response.ok) {
                        holidays = await response.json();
                    }
                } catch (apiError) {
                    console.warn("Failed to fetch holidays:", apiError);
                    // Non-critical api failure, don't block the app
                }

                // Merge static items with holiday data if dates match
                const mergedItems = staticItems.map(item => {
                    const itemDate = new Date(item.date); // Assuming date format "Oct 12, 2026" works with Date constructor
                    const holiday = holidays.find(h => {
                        const hDate = new Date(h.date);
                        return hDate.getDate() === itemDate.getDate() &&
                            hDate.getMonth() === itemDate.getMonth();
                    });

                    return {
                        ...item,
                        isHoliday: !!holiday,
                        holidayName: holiday ? holiday.name : null
                    };
                });

                setItems(mergedItems);
                setCategories(staticCategories);
                setLoading(false);

            } catch (err) {
                setError(err.message || "Failed to load data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const value = useMemo(() => ({
        items,
        categories,
        highlights,
        loading,
        error,
        theme,
        toggleTheme
    }), [items, categories, loading, error, theme]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};
