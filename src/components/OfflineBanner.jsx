import useOnlineStatus from '../hooks/useOnlineStatus';

const OfflineBanner = () => {
    const isOnline = useOnlineStatus();

    if (isOnline) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-eco-charcoal-800 text-white text-center py-3 px-4 z-50 animate-slide-up shadow-lg border-t border-harvest-green-500" role="alert" aria-live="assertive">
            <p className="flex items-center justify-center gap-2 font-medium">
                <span className="text-xl">📡</span>
                You are currently offline. Some features may be limited.
            </p>
        </div>
    );
};

export default OfflineBanner;
