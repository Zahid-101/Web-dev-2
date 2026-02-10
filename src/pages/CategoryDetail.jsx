import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import ItemCard from '../components/ItemCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoryDetail = () => {
    const { slug } = useParams();
    const { items, loading, error } = useContext(DataContext);

    // Filter items based on the slug from the URL
    const categoryItems = items.filter(item => item.categorySlug === slug);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <h1 className="text-3xl font-bold capitalize">Category: {slug}</h1>
                <Button to="/categories" variant="secondary">Back to Categories</Button>
            </div>

            <p className="text-lg text-eco-charcoal">Here you will find all upcoming workshops and items related to <span className="font-semibold text-harvest-green">{slug}</span>.</p>

            {categoryItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryItems.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-eco-charcoal-800 rounded-lg">
                    <p className="text-xl text-gray-500">No items found for this category.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryDetail;
