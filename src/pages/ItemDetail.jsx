import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import Button from '../components/Button';
import SkeletonCard from '../components/SkeletonCard';
import NotificationButton from '../components/NotificationButton';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { items, loading, error } = useContext(DataContext);

    // Find item from context
    // The ID from URL is a string, but the items from DB have number IDs. 
    // We should parse or type check.
    const item = items.find(i => i.id === parseInt(id) || i.id === id);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <SkeletonCard />
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;

    if (!item) {
        return <div className="container mx-auto px-4 py-8">Item not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-harvest-green-800 dark:text-harvest-green-400">{item.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>

            {item.isHoliday && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r shadow-md" role="alert">
                    <p className="font-bold">Public Holiday Alert</p>
                    <p>This event falls on <strong>{item.holidayName}</strong>. Please check for special opening hours.</p>
                </div>
            )}

            <div className="glass-card p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Date & Time</h3>
                        <p className="text-xl font-medium">{item.date}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Location</h3>
                        <p className="text-xl font-medium">{item.location}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button onClick={() => navigate('/booking')} className="flex-1">Book Now</Button>
                <NotificationButton itemName={item.title} startTime={item.date} />
                <Button onClick={() => navigate(-1)} variant="secondary" className="flex-1">Go Back</Button>
            </div>
        </div>
    );
};

export default ItemDetail;
