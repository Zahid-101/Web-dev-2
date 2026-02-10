import Button from '../components/Button';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-harvest-green-800 dark:text-harvest-green-400 mb-4">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Oops! The page you are looking for does not exist.</p>
            <Button to="/">Go Home</Button>
        </div>
    );
};

export default NotFound;
