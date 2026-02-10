import React from 'react';
import Button from './Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                        {this.state.error && this.state.error.toString()}
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Reload Application
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
