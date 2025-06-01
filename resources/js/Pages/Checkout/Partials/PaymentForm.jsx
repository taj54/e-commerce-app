import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import CustomTextField from '../../../Components/Common/CustomTextField';

export default function PaymentForm({ form, errors, handleChange }) {
    return (
        <>
            <Typography variant="h6" color="primary" sx={{ textAlign: 'center', mb: 2 }}>
                Payment Details
            </Typography>
            <Divider
                sx={{
                    mx: 2,
                    borderColor: 'primary.main',
                    borderBottomWidth: 2,
                    opacity: 1,
                    mb: 2,
                }}
            />
            <Grid container columns={12} spacing={2}>
                <Grid span={12}>
                    <CustomTextField
                        label="Card Number"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        error={errors.cardNumber}
                        helperText={errors.cardNumber}
                            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    />
                </Grid>
                <Grid span={6}>
                    <CustomTextField
                        label="Expiry Date (MM/YY)"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        error={errors.expiry}
                        helperText={errors.expiry}
                        placeholder="MM/YY"
                    />
                </Grid>
                <Grid span={6}>
                    <CustomTextField
                        label="CVV"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        error={errors.cvv}
                        helperText={errors.cvv}
                    />
                </Grid>
            </Grid>
        </>
    );
}