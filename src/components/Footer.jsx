const Footer = () => {
    return (
        <footer className="bg-eco-charcoal-900 text-gray-300 py-8 mt-auto border-t border-eco-charcoal-800">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} Urban Harvest Hub. All rights reserved.</p>
                <p className="text-sm text-gray-500">Empowering sustainable living in your city.</p>
            </div>
        </footer>
    );
};

export default Footer;
