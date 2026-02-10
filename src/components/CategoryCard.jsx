import PropTypes from 'prop-types';
import Button from './Button';

const CategoryCard = ({ category }) => {
    return (
        <div className="category-card">
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <Button to={`/categories/${category.slug}`}>View Details</Button>
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
