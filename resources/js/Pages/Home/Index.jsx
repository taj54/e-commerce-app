import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { Head, router, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TopBar from './Partials/TopBar';
import ProductCard from './Partials/ProductCard';
import CartFloatingBox from './Partials/CartFloatingBox';

export default function Home() {
    const { title, products } = usePage().props;

    // Initialize selectedVariants with the first variant for each product
    const initialVariants = React.useMemo(() => {
        const obj = {};
        products.forEach(product => {
            obj[product.id] = product.variants[0];
        });
        return obj;
    }, [products]);

    const [selectedVariants, setSelectedVariants] = React.useState(initialVariants);
    const [quantities, setQuantities] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleVariantChange = (productId, value) => {
        setSelectedVariants(prev => ({
            ...prev,
            [productId]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [productId]: '', // Clear error on change
        }));
    };

    const handleQuantityChange = (productId, value) => {
        const qty = Math.max(1, Number(value));
        setQuantities(prev => ({
            ...prev,
            [productId]: qty,
        }));
    };

    const handleAddToCart = (product) => {
        const variant = selectedVariants[product.id];
        const quantity = quantities[product.id] || 1;
        if (!variant) {
            setErrors(prev => ({
                ...prev,
                [product.id]: 'Please select a variant before adding to cart.',
            }));
            return;
        }
        const price = product.variantPrices && product.variantPrices[variant]
            ? product.variantPrices[variant]
            : product.price;

        dispatch(addToCart({ product, variant, quantity, price }));

        setErrors(prev => ({
            ...prev,
            [product.id]: '', // Clear error on add
        }));
    };

    return (
        <>
            <Head title={title} />
            <TopBar cartCount={cart.length} />
            <Box display="flex" gap={8} flexWrap="wrap" p={3} justifyContent="center">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        selectedVariant={selectedVariants[product.id]}
                        quantity={quantities[product.id] || 1}
                        error={errors[product.id]}
                        onVariantChange={handleVariantChange}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </Box>

            <CartFloatingBox cart={cart} />
        </>
    );
}