import { useParams, useNavigate } from 'react-router-dom';
import { items } from '../data/mockData';
import Button from '../components/Button';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = items.find(i => i.id === id);

    if (!item) {
        return <div className="container">Item not found</div>;
    }

    return (
        <div className="item-detail-container">
            <h1>{item.title}</h1>
            <p className="subtitle" style={{ color: '#666', fontSize: '1.2rem' }}>{item.description}</p>

            <div className="item-info" style={{ marginTop: '2rem', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3>Date & Time</h3>
                <p>{item.date}</p>

                <h3 style={{ marginTop: '1rem' }}>Location</h3>
                <p>{item.location}</p>
            </div>

            <div className="actions" style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
                <Button onClick={() => navigate('/booking')}>Book Now</Button>
                <Button onClick={() => navigate(-1)} variant="secondary">Go Back</Button>
            </div>
        </div>
    );
};

export default ItemDetail;
