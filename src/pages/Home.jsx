import { highlights } from '../data/mockData';
import HighlightCard from '../components/HighlightCard';
import Button from '../components/Button';

const Home = () => {
    return (
        <div className="space-y-12">
            <section className="text-center py-16 px-4 bg-harvest-green-50 dark:bg-harvest-green-900/20 rounded-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-harvest-green-800 dark:text-harvest-green-300">Welcome to Urban Harvest Hub</h1>
                <p className="text-xl text-eco-charcoal-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Connecting you with eco-friendly initiatives and sustainable living.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button to="/categories">Explore Categories</Button>
                    <Button to="/booking" variant="secondary">Join Us</Button>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-10 text-eco-charcoal-800 dark:text-white">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map(highlight => (
                        <HighlightCard
                            key={highlight.id}
                            title={highlight.title}
                            description={highlight.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
