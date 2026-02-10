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
        <div className="categories-container">
            <h1>Eco-Friendly Initiatives</h1>
            <p>Explore our wide range of categories to start your sustainable journey.</p>

            <div className="controls" style={{ margin: '20px 0' }}>
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '10px', width: '100%', maxWidth: '400px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="categories-list">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                ) : (
                    <p>No categories found matching "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
};

export default Categories;
