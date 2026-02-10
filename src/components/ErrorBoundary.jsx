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
                <div className="error-container" style={{ textAlign: 'center', padding: '50px' }}>
                    <h1>Something went wrong.</h1>
                    <p style={{ color: 'red' }}>{this.state.error && this.state.error.toString()}</p>
                    <Button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
                        Reload Application
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
