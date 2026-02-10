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
        <div className="max-w-2xl mx-auto glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Book Your Spot</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div>
                    <label htmlFor="event" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event / Workshop</label>
                    <select
                        id="event"
                        name="event"
                        value={formData.event}
                        onChange={handleChange}
                        required
                        className="input-field"
                    >
                        <option value="">Select an option</option>
                        <option value="gardening">Urban Gardening 101</option>
                        <option value="recycling">Recycling Masterclass</option>
                    </select>
                </div>

                <Button type="submit" className="w-full">Confirm Booking</Button>
            </form>
        </div>
    );
};

export default Booking;
