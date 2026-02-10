import PropTypes from 'prop-types';
import Button from './Button';

const ItemCard = ({ item }) => {
    return (
        <div className="glass-card p-6 flex flex-col h-full card-hover">
            <h3 className="text-xl font-bold mb-2 text-harvest-green">{item.title}</h3>
            <p className="text-eco-charcoal mb-4 flex-grow">{item.description}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                <p>📅 {item.date}</p>
                <p>📍 {item.location}</p>
            </div>
            <Button to={`/details/${item.id}`} variant="secondary" className="w-full mt-auto">View Details</Button>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string,
        location: PropTypes.string
    }).isRequired
};

export default ItemCard;
