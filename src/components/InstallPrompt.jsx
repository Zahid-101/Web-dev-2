import { useState, useEffect } from 'react';
import Button from './Button';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-eco-charcoal-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 animate-slide-up">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-harvest-green-100 dark:bg-harvest-green-900/30 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-harvest-green-600 dark:text-harvest-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Install Urban Harvest Hub</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get the native app experience for easier access.</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setShowBanner(false)}
                        className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-eco-charcoal-700 rounded-lg transition-colors"
                    >
                        Maybe Later
                    </button>
                    <Button onClick={handleInstallClick} className="flex-1 sm:flex-none">
                        Download App
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;
