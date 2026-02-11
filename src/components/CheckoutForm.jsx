import { useState, useContext, useMemo } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from './Button';
import { DataContext } from '../context/DataContext';

const CheckoutForm = ({ clientSecret, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { theme } = useContext(DataContext);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    // Enhanced modern styling
    const cardStyle = useMemo(() => {
        const isDark = theme === 'dark';
        return {
            style: {
                base: {
                    fontSize: '16px',
                    fontFamily: '"Inter", sans-serif',
                    color: isDark ? '#ffffff' : '#1f2937', // brand-gray-900 or white
                    iconColor: isDark ? '#4ade80' : '#16a34a', // harvest-green-400/600
                    '::placeholder': {
                        color: isDark ? '#9ca3af' : '#6b7280',
                    },
                    padding: '12px',
                },
                invalid: {
                    color: '#ef4444',
                    iconColor: '#ef4444',
                },
                complete: {
                    color: isDark ? '#4ade80' : '#16a34a',
                    iconColor: isDark ? '#4ade80' : '#16a34a',
                }
            },
        };
    }, [theme]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setProcessing(false);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
        } else {
            if (paymentIntent.status === 'succeeded') {
                onSuccess(paymentIntent.id);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Card Details
                </label>
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-eco-charcoal-800 transition-all duration-300 group-hover:border-harvest-green-400 group-focus-within:ring-2 group-focus-within:ring-harvest-green-500/20 group-focus-within:border-harvest-green-500 shadow-sm">
                    <CardElement options={cardStyle} />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            <Button type="submit" disabled={!stripe || processing} className="w-full py-3 text-lg font-medium shadow-lg hover:shadow-xl transform transition-all active:scale-95">
                {processing ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </span>
                ) : 'Pay & Complete Booking'}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-4">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                </svg>
                Secure 256-bit SSL Encrypted Payment
            </div>
        </form>
    );
};

export default CheckoutForm;
