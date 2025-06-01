import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Tooltip } from '@mui/material';
import { router } from '@inertiajs/react';

export default function CartFloatingBox({ cart }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                zIndex: 1300,
            }}
        >
            <Tooltip title="Go to Checkout">
                <IconButton
                    color="primary"
                    size="large"
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                    }}
                    onClick={() => router.visit('/checkout')}
                >
                    <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCartIcon sx={{ fontSize: 32 }} />
                    </Badge>
                </IconButton>
            </Tooltip>
        </Box>
    );
}