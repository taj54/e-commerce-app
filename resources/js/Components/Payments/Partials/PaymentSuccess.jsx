import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Loader from '../../Common/Loader';

export default function PaymentSuccess({ message = "Your payment was successful!" }) {
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" gutterBottom color="success.main">
                    Payment Successful
                </Typography>
                <Typography sx={{ mb: 3 }}>{message}</Typography>
                <Loader message="Redirecting..." />
            </Paper>
        </Box>
    );
}