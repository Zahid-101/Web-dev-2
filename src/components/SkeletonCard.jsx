const SkeletonCard = () => {
    return (
        <div className="glass-card p-6 flex flex-col h-full animate-pulse" aria-hidden="true">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6 flex-grow"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-auto"></div>
        </div>
    );
};

export default SkeletonCard;
