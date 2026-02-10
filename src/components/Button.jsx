import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ children, onClick, to, variant = 'primary', type = 'button', style, className = '' }) => {
    const baseClass = "btn";
    const variantClass = variant === 'primary' ? "btn-primary" : "btn-secondary";
    const finalClass = `${baseClass} ${variantClass} ${className}`;

    if (to) {
        return <Link to={to} className={finalClass} style={style}>{children}</Link>;
    }

    return (
        <button type={type} onClick={onClick} className={finalClass} style={style}>
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
    style: PropTypes.object,
    className: PropTypes.string
};

export default Button;
