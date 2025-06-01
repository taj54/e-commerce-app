import React from 'react';
import { Box, Paper, Typography, Divider, Grid, Button } from '@mui/material';
import { Head, router,usePage } from '@inertiajs/react';
import { useSelector, useDispatch } from 'react-redux';
import { clearOrderResult, setOrderResult } from '../../store/orderSlice';
import OrderSummary from '../Checkout/Partials/OrderSummary';

export default function ThankYou() {
    const orderResult = useSelector(state => state.order.orderResult);
    const dispatch = useDispatch();
    const { title } = usePage().props;

    // Fallback: Load from localStorage if Redux is empty
    React.useEffect(() => {
        if (!orderResult) {
            try {
                const serialized = localStorage.getItem('orderResult');
                if (serialized) {
                    dispatch(setOrderResult(JSON.parse(serialized)));
                }
            } catch { }
        }
        // Optionally clear order result after showing
        // return () => dispatch(clearOrderResult());
    }, [dispatch, orderResult]);

    // After fallback, get the latest value
    const finalOrderResult = useSelector(state => state.order.orderResult);

    if (!finalOrderResult) {
        return <div>No order found.</div>;
    }

    const orderNumber = finalOrderResult.order_number || finalOrderResult.orderNumber || 'N/A';
    const customerDetails = finalOrderResult.customer || {};
    const customer = {
        fullName: customerDetails.fullName || 'N/A',
        email: customerDetails.email || 'N/A',
        phone: customerDetails.phone || 'N/A',
        address: customerDetails.address || 'N/A',
        city: customerDetails.city || 'N/A',
        state: customerDetails.state || 'N/A',
        zip: customerDetails.zip || 'N/A',
    };
  const handleContineueShopping = () => {
        router.visit('/home');
        // Optionally clear order result after redirecting
        dispatch(clearOrderResult());
    }
    return (
        <>
            <Head title={title} />
            <Box sx={{ maxWidth: 700, mx: 'auto', mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Thank You for Your Order!
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Your Order Number: <b>{orderNumber}</b>
                    </Typography>
                    <Divider sx={{ my: 3 }} />

                    <OrderSummary cartItems={finalOrderResult.items} total={finalOrderResult.total} editable={false} />

                    <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
                        Customer Details
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography><b>Name:</b> {customer.fullName}</Typography>
                            <Typography><b>Email:</b> {customer.email}</Typography>
                            <Typography><b>Phone:</b> {customer.phone}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><b>Address:</b> {customer.address}</Typography>
                            <Typography><b>City:</b> {customer.city}</Typography>
                            <Typography><b>State:</b> {customer.state}</Typography>
                            <Typography><b>Zip:</b> {customer.zip}</Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" color="success.main" align="center" sx={{ mb: 2 }}>
                        Your order has been placed successfully!
                        <br />A confirmation email will be sent to you shortly.
                    </Typography>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleContineueShopping}>
                            Continue Shopping
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}