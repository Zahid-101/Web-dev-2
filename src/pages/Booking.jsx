import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CheckoutForm from '../components/CheckoutForm';

// Initialize Stripe outside of component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const Booking = () => {
    const [items, setItems] = useState([]);
    const [clientSecret, setClientSecret] = useState('');
    const [bookingStep, setBookingStep] = useState(1); // 1: Details, 2: Payment, 3: Success
    const [bookingData, setBookingData] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [bookedItem, setBookedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch items from backend
        fetch('http://localhost:5000/api/items')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setItems(data.data);
                }
            })
            .catch(err => console.error("Failed to fetch items:", err));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            item_id: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Name must be at least 2 characters').required('Full Name is required'),
            email: Yup.string().email('Invalid email address').required('Email Address is required'),
            item_id: Yup.string().required('Please select an event'),
        }),
        onSubmit: async (values) => {
            setSubmitError('');
            try {
                const res = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ item_id: values.item_id })
                });
                const data = await res.json();

                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                    setBookingData(values);
                    setBookedItem(items.find(i => i.id == values.item_id));
                    setBookingStep(2);
                } else {
                    setSubmitError('Failed to initialize payment. Please try again.');
                }
            } catch (err) {
                console.error(err);
                setSubmitError('Network error. Please check your connection.');
            }
        },
    });

    const handlePaymentSuccess = async (paymentIntentId) => {
        try {
            const res = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: 1, // Hardcoded for now
                    item_id: bookingData.item_id,
                    payment_intent_id: paymentIntentId
                })
            });

            const data = await res.json();

            if (data.success) {
                setBookingStep(3); // Success state
            } else {
                setSubmitError('Payment successful but booking failed to save. Please contact support.');
            }
        } catch (err) {
            setSubmitError('Critical error finalizing booking.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {bookingStep === 3 ? (
                <div className="glass-card p-10 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-harvest-green-900 dark:text-harvest-green-100 mb-4">Booking Confirmed!</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Thank you, <strong>{bookingData?.name}</strong>! Your spot for <br />
                        <span className="font-semibold text-harvest-green-600 dark:text-harvest-green-400">{bookedItem?.title}</span> has been secured.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => navigate('/')} className="px-8">Back to Home</Button>
                        <Button onClick={() => navigate('/categories')} variant="secondary">Explore More</Button>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center text-harvest-green-900 dark:text-harvest-green-100">
                        {bookingStep === 1 ? 'Book Your Spot' : 'Secure Payment'}
                    </h1>

                    {bookingStep === 1 && (
                        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
                            {/* Form Fields - kept same as before but ensured layout consistency */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...formik.getFieldProps('name')}
                                    className={`input-field ${formik.touched.name && formik.errors.name ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...formik.getFieldProps('email')}
                                    className={`input-field ${formik.touched.email && formik.errors.email ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="item_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event / Workshop</label>
                                <select
                                    id="item_id"
                                    {...formik.getFieldProps('item_id')}
                                    className={`input-field ${formik.touched.item_id && formik.errors.item_id ? 'border-red-500 ring-red-500' : ''}`}
                                >
                                    <option value="">Select an option</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.title} - ${item.price}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.item_id && formik.errors.item_id && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.item_id}</div>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                                Proceed to Payment
                            </Button>

                            {submitError && <div className="text-red-500 text-sm mt-2">{submitError}</div>}
                        </form>
                    )}

                    {bookingStep === 2 && clientSecret && (
                        <div className="space-y-6">
                            <div className="bg-harvest-green-50 dark:bg-harvest-green-900/20 p-4 rounded-lg border border-harvest-green-100 dark:border-harvest-green-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                                <p className="text-2xl font-bold text-harvest-green-800 dark:text-harvest-green-400">
                                    ${bookedItem?.price}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    For <strong>{bookedItem?.title}</strong>
                                </p>
                            </div>

                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
                            </Elements>

                            <button
                                onClick={() => setBookingStep(1)}
                                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline mt-4"
                            >
                                Cancel & Go Back
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Booking;
