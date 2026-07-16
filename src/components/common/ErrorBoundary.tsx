import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorState = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

type ErrorProps = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  state: ErrorState = { error: null, errorInfo: null };

  componentDidCatch = (
    error: ErrorState['error'],
    errorInfo: ErrorState['errorInfo'],
  ) => {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  };

  render = () => {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    if (errorInfo) {
      return (
        <div
          style={{
            padding: 24,
            minHeight: '100vh',
            background: '#fff',
            color: '#1f1f1f',
            fontFamily: 'system-ui, sans-serif',
          }}>
          <div
            style={{
              maxWidth: 800,
              margin: '0 auto',
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              padding: 24,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}>
            <h2 style={{ marginTop: 0 }}>Что-то пошло не так</h2>
            <div
              style={{
                padding: 12,
                background: '#fff2f0',
                border: '1px solid #ffccc7',
                borderRadius: 6,
                color: '#a8071a',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
              <h3>{error?.message}</h3>
              <pre>{errorInfo.componentStack}</pre>
            </div>
          </div>
        </div>
      );
    }
    return children;
  };
}
