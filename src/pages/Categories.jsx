import { useContext, useState, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Categories = () => {
    const { categories, loading, error } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = useMemo(() => {
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Eco-Friendly Initiatives</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Explore our wide range of categories to start your sustainable journey.</p>
            </div>

            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field max-w-md"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No categories found matching "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
};

export default Categories;
