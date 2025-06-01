import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function Loader({ size = 48, color = 'primary', message = '' }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 120,
                width: '100%',
            }}
        >
            <CircularProgress size={size} color={color} />
            {message && (
                <Box sx={{ mt: 2, color: 'text.secondary', fontSize: 16 }}>
                    {message}
                </Box>
            )}
        </Box>
    );
}