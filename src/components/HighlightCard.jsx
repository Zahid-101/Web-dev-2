import PropTypes from 'prop-types';

const HighlightCard = ({ title, description }) => {
    return (
        <div className="glass-card p-6 card-hover">
            <h3 className="text-xl font-bold mb-2 text-harvest-green-700 dark:text-harvest-green-400">{title}</h3>
            <p className="text-eco-charcoal-600 dark:text-gray-300">{description}</p>
        </div>
    );
};

HighlightCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default HighlightCard;
