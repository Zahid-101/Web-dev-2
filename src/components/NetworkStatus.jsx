import { useState, useEffect } from 'react';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Only show if offline, or maybe show green dot if online?
    // User asked for: "Status indicator in the Header that turns red when navigator.onLine is false"
    // So we'll visualize it always, but red when offline.

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${isOnline
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}
            title={isOnline ? "You are online" : "You are offline"}
        >
            <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
    );
};

export default NetworkStatus;
