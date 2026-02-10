import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';

const Booking = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            event: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .required('Full Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email Address is required'),
            event: Yup.string()
                .required('Please select an event'),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            // Simulate API call
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                resetForm();
            }, 1000);
        },
    });

    return (
        <div className="max-w-2xl mx-auto glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-harvest-green">
                Book Your Spot
            </h1>

            <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                        className={`input-field ${formik.touched.name && formik.errors.name
                            ? 'border-red-500 ring-red-500 focus:ring-red-500'
                            : ''
                            }`}
                        aria-invalid={formik.touched.name && formik.errors.name ? 'true' : 'false'}
                        aria-describedby="name-error"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div id="name-error" className="text-red-500 text-sm mt-1 animate-pulse" role="alert">
                            {formik.errors.name}
                        </div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                        className={`input-field ${formik.touched.email && formik.errors.email
                            ? 'border-red-500 ring-red-500 focus:ring-red-500'
                            : ''
                            }`}
                        aria-invalid={formik.touched.email && formik.errors.email ? 'true' : 'false'}
                        aria-describedby="email-error"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div id="email-error" className="text-red-500 text-sm mt-1 animate-pulse" role="alert">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="event" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Event / Workshop
                    </label>
                    <select
                        id="event"
                        {...formik.getFieldProps('event')}
                        className={`input-field ${formik.touched.event && formik.errors.event
                            ? 'border-red-500 ring-red-500 focus:ring-red-500'
                            : ''
                            }`}
                        aria-invalid={formik.touched.event && formik.errors.event ? 'true' : 'false'}
                        aria-describedby="event-error"
                    >
                        <option value="">Select an option</option>
                        <option value="gardening">Urban Gardening 101</option>
                        <option value="recycling">Recycling Masterclass</option>
                    </select>
                    {formik.touched.event && formik.errors.event ? (
                        <div id="event-error" className="text-red-500 text-sm mt-1 animate-pulse" role="alert">
                            {formik.errors.event}
                        </div>
                    ) : null}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                    style={{ opacity: (!formik.isValid || formik.isSubmitting || !formik.dirty) ? 0.5 : 1 }}
                >
                    {formik.isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
            </form>
        </div>
    );
};

export default Booking;
