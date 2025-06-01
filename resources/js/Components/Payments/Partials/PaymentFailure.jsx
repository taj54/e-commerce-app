import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { router } from '@inertiajs/react';

export default function PaymentFailure({ message = "Your payment failed. Please try again." }) {
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <CancelOutlinedIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" gutterBottom color="error.main">
                    Payment Failed
                </Typography>
                <Typography sx={{ mb: 3 }}>{message}</Typography>
                <Button variant="contained" color="primary" onClick={() => router.visit('/checkout')}>
                    Back to Checkout
                </Button>

            </Paper>
        </Box>
    );
}