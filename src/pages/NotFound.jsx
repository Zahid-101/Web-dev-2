import Button from '../components/Button';

const NotFound = () => {
    return (
        <div className="not-found-container" style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Button to="/" style={{ marginTop: '20px' }}>Go Home</Button>
        </div>
    );
};

export default NotFound;
