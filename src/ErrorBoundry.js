import React, { Component } from 'react';
import {
  Box,
  Button,
  Card,
  Link,
  Typography,
} from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  handleReportError = () => {
    // Logic to report the error
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Card elevation={1} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" mb={2}>
              We apologize for the inconvenience.
            </Typography>
            <Link
              href="https://github.com/jspegele/warframe-mastery-checklist/issues"
              target="_blank"
              rel="noreferrer"
              variant="contained"
              color="primary"
              onClick={this.handleReportError}
            >
              Report Error
            </Link>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;