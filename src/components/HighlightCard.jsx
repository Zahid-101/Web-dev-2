import PropTypes from 'prop-types';

const HighlightCard = ({ title, description }) => {
    return (
        <div className="glass-card p-6 card-hover">
            <h3 className="text-xl font-bold mb-2 text-harvest-green">{title}</h3>
            <p className="text-eco-charcoal">{description}</p>
        </div>
    );
};

HighlightCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default HighlightCard;
