import { useState, useEffect } from 'react';
import Button from './Button';

const InstallBanner = () => {
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

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-20 md:left-auto md:right-4 md:w-80 bg-white dark:bg-eco-charcoal-800 p-4 shadow-xl border-t md:border border-harvest-green-500 z-50 flex flex-col gap-3 rounded-t-xl md:rounded-xl animate-slide-up">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-harvest-green-800 dark:text-harvest-green-400">Install App</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get better performance and offline access.</p>
                </div>
                <button
                    onClick={() => setShowBanner(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Dismiss install banner"
                >
                    ✕
                </button>
            </div>
            <Button onClick={handleInstallClick} className="w-full text-sm py-2">
                Install Urban Harvest Hub
            </Button>
        </div>
    );
};

export default InstallBanner;
