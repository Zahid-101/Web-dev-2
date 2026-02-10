const Footer = () => {
    const handleNotification = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications");
            return;
        }

        let permission = Notification.permission;

        if (permission !== "granted") {
            permission = await Notification.requestPermission();
        }

        if (permission === "granted") {
            new Notification("Welcome to Urban Harvest Hub!", {
                body: "New eco-workshops are available near you.",
                icon: "/pwa-icon.svg"
            });
        }
    };

    return (
        <footer className="bg-white dark:bg-eco-charcoal-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        &copy; 2026 Urban Harvest Hub. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={handleNotification}
                            className="text-sm text-harvest-green-600 dark:text-harvest-green-400 hover:text-harvest-green-700 dark:hover:text-harvest-green-300 transition-colors"
                        >
                            🔔 Enable Notifications
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
