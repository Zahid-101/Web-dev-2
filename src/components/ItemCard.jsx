import PropTypes from 'prop-types';
import Button from './Button';

const ItemCard = ({ item }) => {
    return (
        <div className="item-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p className="item-meta"><small>{item.date} | {item.location}</small></p>
            <Button to={`/details/${item.id}`} variant="secondary" style={{ marginTop: '10px' }}>View Details</Button>
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
