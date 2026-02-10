import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ children, onClick, to, variant = 'primary', type = 'button', style }) => {
    const className = `btn btn-${variant}`;

    if (to) {
        return <Link to={to} className={className} style={style}>{children}</Link>;
    }

    return (
        <button type={type} onClick={onClick} className={className} style={style}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    style: PropTypes.object
};

export default Button;
