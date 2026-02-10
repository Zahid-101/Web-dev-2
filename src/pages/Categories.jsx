import { categories } from '../data/mockData';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
    return (
        <div className="categories-container">
            <h1>Eco-Friendly Initiatives</h1>
            <p>Explore our wide range of categories to start your sustainable journey.</p>
            <div className="categories-list">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
