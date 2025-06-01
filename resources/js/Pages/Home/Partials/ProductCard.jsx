import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function ProductCard({
    product,
    selectedVariant,
    quantity,
    error,
    onVariantChange,
    onQuantityChange,
    onAddToCart
}) {
    const price = product.variantPrices && selectedVariant
        ? product.variantPrices[selectedVariant]
        : product.price;
    const total = price * (quantity || 1);

    return (
        <Card sx={{ width: 300 }}>
            <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                    ${total.toFixed(2)}
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>{product.variantType || 'Variant'}</InputLabel>
                    <Select
                        value={selectedVariant || ''}
                        label={product.variantType || 'Variant'}
                        onChange={e => onVariantChange(product.id, e.target.value)}
                    >
                        {product.variants.map(variant => (
                            <MenuItem key={variant} value={variant}>
                                {variant}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Qty:</Typography>
                    <input
                        type="number"
                        min={1}
                        value={quantity || 1}
                        onChange={e => onQuantityChange(product.id, e.target.value)}
                        style={{ width: 60, padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                </Box>
                {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}