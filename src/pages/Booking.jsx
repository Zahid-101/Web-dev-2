import { useState } from 'react';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        event: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Booking request sent for ${formData.name}!`);
        // Here you would integrate with a backend
    };

    return (
        <div className="booking-container">
            <h1>Book Your Spot</h1>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="event">Event / Workshop</label>
                    <select
                        id="event"
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="gardening">Urban Gardening 101</option>
                        <option value="recycling">Recycling Masterclass</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
        </div>
    );
};

export default Booking;
