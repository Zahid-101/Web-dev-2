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
        <div className="category-detail-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ textTransform: 'capitalize' }}>Category: {slug}</h1>
                <Button to="/categories" variant="secondary">Back to Categories</Button>
            </div>

            <p>Here you will find all upcoming workshops and items related to {slug}.</p>

            {categoryItems.length > 0 ? (
                <div className="items-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {categoryItems.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p>No items found for this category.</p>
            )}
        </div>
    );
};

export default CategoryDetail;
