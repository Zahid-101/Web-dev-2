import { useContext, useState, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import CategoryCard from '../components/CategoryCard';
import SkeletonCard from '../components/SkeletonCard';

const Categories = () => {
    const { categories, loading, error } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = useMemo(() => {
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;

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
                    aria-label="Search categories"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
                {loading ? (
                    // Show 6 skeleton cards while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No categories found</h3>
                        <p className="text-gray-500">We couldn't find any categories matching "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
