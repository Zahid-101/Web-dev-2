import PropTypes from 'prop-types';
import Button from './Button';

const CategoryCard = ({ category }) => {
    return (
        <div className="glass-card p-6 flex flex-col h-full card-hover">
            <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
            <p className="text-eco-charcoal mb-6 flex-grow">{category.description}</p>
            <Button to={`/categories/${category.slug}`} className="w-full">View Details</Button>
        </div>
    );
};

CategoryCard.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default CategoryCard;
