import { highlights } from '../data/mockData';
import HighlightCard from '../components/HighlightCard';
import Button from '../components/Button';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <h1>Welcome to Urban Harvest Hub</h1>
                <p>Connecting you with eco-friendly initiatives and sustainable living.</p>
                <div className="cta-buttons">
                    <Button to="/categories">Explore Categories</Button>
                    <Button to="/booking" variant="secondary">Join Us</Button>
                </div>
            </section>

            <section className="highlights">
                <h2>Why Choose Us?</h2>
                <div className="highlight-grid">
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
