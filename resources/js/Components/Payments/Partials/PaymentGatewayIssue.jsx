import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { router } from '@inertiajs/react';

export default function PaymentGatewayIssue({ message = "There was an issue with the payment gateway. Please try again later." }) {
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <ReportProblemOutlinedIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" gutterBottom color="warning.main">
                    Payment Gateway Issue
                </Typography>
                <Typography sx={{ mb: 3 }}>{message}</Typography>
                <Button variant="contained" color="primary" onClick={() => router.visit('/checkout')}>
                    Back to Checkout
                </Button>
            </Paper>
        </Box>
    );
}