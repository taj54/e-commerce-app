import React from 'react';
import { Button, Grid, Divider, Typography, Box } from '@mui/material';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

export default function CheckoutForm({ form, errors, handleChange, handlePlaceOrder }) {

    return (
        <Box component="form" onSubmit={handlePlaceOrder} sx={{ mt: 2 }}>
            {/* <Typography variant="h6" gutterBottom color="primary">
                Shipping & Payment Details
            </Typography>*/}
            <Divider sx={{ mb: 2 }} /> 
            <Grid container spacing={2}>
                <AddressForm form={form} errors={errors} handleChange={handleChange} />
              
                <PaymentForm form={form} errors={errors} handleChange={handleChange} />
            </Grid>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2, float: 'right',m:5, px: 4, py: 1.5, fontWeight: 600 }}
              
            >
                Place Order
            </Button>
        </Box>
    );
}