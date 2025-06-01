import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import CustomTextField from '../../../Components/Common/CustomTextField';

export default function AddressForm({ form, errors, handleChange }) {
    return (
        <>
            <Typography variant="h6" gutterBottom color="primary">
                Shipping Details
            </Typography>
            {/* <Divider /> */}
            
            <Grid container columns={12} spacing={2}>
                <Grid span={12}>
                    <CustomTextField
                        label="Full Name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                        helperText={errors.fullName}
                    />
                </Grid>
                <Grid span={12}>
                    <CustomTextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid span={12}>
                    <CustomTextField
                        label="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid span={12}>
                    <CustomTextField
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={errors.address}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid span={6}>
                    <CustomTextField
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        error={errors.city}
                        helperText={errors.city}
                    />
                </Grid>
                <Grid span={3}>
                    <CustomTextField
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        error={errors.state}
                        helperText={errors.state}
                    />
                </Grid>
                <Grid span={3}>
                    <CustomTextField
                        label="Zip Code"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        error={errors.zip}
                        helperText={errors.zip}
                    />
                </Grid>
            </Grid>
        </>
    );
}