import { useParams } from 'react-router-dom';
import { items } from '../data/mockData';
import ItemCard from '../components/ItemCard';
import Button from '../components/Button';

const CategoryDetail = () => {
    const { slug } = useParams();
    const categoryItems = items.filter(item => item.categorySlug === slug);

    return (
        <div className="category-detail-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Category: {slug}</h1>
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
