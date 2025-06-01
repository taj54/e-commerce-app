import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function OrderSummary({ cartItems, total, editable, onQuantityChange }) {
    // Calculate total quantity of all items
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Handlers should always be defined
    const handleInputChange = (e, idx) => {
        if (!editable) return;
        const value = Math.max(1, parseInt(e.target.value) || 1);
        onQuantityChange && onQuantityChange(idx, value);
    };

    const handleIncrement = (idx, current) => {
        if (!editable) return;
        onQuantityChange && onQuantityChange(idx, current + 1);
    };

    const handleDecrement = (idx, current) => {
        if (!editable) return;
        if (current > 1) {
            onQuantityChange && onQuantityChange(idx, current - 1);
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
                Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Product</b></TableCell>
                            <TableCell><b>Variant</b></TableCell>
                            <TableCell align="center"><b>Quantity</b></TableCell>
                            <TableCell align="right"><b>Price</b></TableCell>
                            <TableCell align="right"><b>Subtota</b>l</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.variant}</TableCell>
                                <TableCell align="center">
                                    {editable ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDecrement(idx, item.quantity)}
                                                disabled={item.quantity <= 1 || !editable}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <TextField
                                                type="number"
                                                size="small"
                                                value={item.quantity}
                                                onChange={e => handleInputChange(e, idx)}
                                                inputProps={{ min: 1, style: { width: 40, textAlign: 'center' } }}
                                                sx={{ mx: 1 }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleIncrement(idx, item.quantity)}
                                                disabled={!editable}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Typography variant="body2">{item.quantity}</Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">${item.price}</TableCell>
                                <TableCell align="right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Add summary rows */}
                        <TableRow>
                            <TableCell align="left"><b>Total Items</b></TableCell>
                            <TableCell colSpan={4} align="right">{totalQuantity}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left"><b>Total</b></TableCell>
                            <TableCell colSpan={4}  align="right"><b>${total.toFixed(2)}</b></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}