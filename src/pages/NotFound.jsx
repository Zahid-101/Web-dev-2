import Button from '../components/Button';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-harvest-green mb-4">404</h1>
            <p className="text-xl text-eco-charcoal mb-8">Oops! The page you are looking for does not exist.</p>
            <Button to="/">Go Home</Button>
        </div>
    );
};

export default NotFound;
