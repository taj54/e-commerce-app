import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { setOrderResult } from '../../store/orderSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import OrderSummary from './Partials/OrderSummary';
import CheckoutForm from './Partials/CheckoutForm';
import { validateCheckoutForm } from '../../utils/formUtils';
import PaymentSuccess from '../../Components/Payments/Partials/PaymentSuccess';
import PaymentStatusModal from '../../Components/Payments/PaymentStatusModal';
import { Head, router, usePage } from '@inertiajs/react';

const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
};

export default function Checkout() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const [form, setForm] = React.useState(initialForm);
    const [errors, setErrors] = React.useState({});
    const [localCart, setLocalCart] = React.useState(cartItems);
    const [paymentStatus, setPaymentStatus] = React.useState(null); // 'success' | 'failure' | 'gateway'
    const [modalOpen, setModalOpen] = React.useState(false);
    const { title, orderResult } = usePage().props;
    const [isSubmitted, setIsSubmitted] = React.useState(false); // Add this line


    const total = localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Update quantity in localCart state
    const handleQuantityChange = (idx, newQty) => {
        setLocalCart(prev => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], quantity: newQty };
            return updated;
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const errs = validateCheckoutForm(form);
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            setIsSubmitted(true);
            if (paymentStatus === 'success') {
                try {
                    await router.post('/orders', {
                        customer: form,
                        items: localCart,
                        total,
                    }, {
                        onSuccess: (response) => {
                            const order = response.props.orderResult;

                            dispatch(setOrderResult(order));
                            handlePaymentResult('success');
                            router.visit('/thank-you');
                            dispatch(clearCart()); // Clear cart after successful order
                        },
                        onError: () => {
                            console.log('Order placement failed');

                        }
                    });
                } catch (error) {
                    console.error('Order placement failed:', error);
                }
            }
            else if (paymentStatus === 'failure') {
                handlePaymentResult('failure');
            }
            else if (paymentStatus === 'gateway') {
                handlePaymentResult('gateway');
            }
            console.log(paymentStatus);

        }
    };

    // Example: Call this after payment attempt
    const handlePaymentResult = (status) => {
        setPaymentStatus(status);
        setModalOpen(true);

        setTimeout(() => {
            setModalOpen(false);
        }, 20000); // 20 seconds delay
    };


    return (
        <>
            <Head title={title} />
            <Box sx={{ maxWidth: 700, mx: 'auto', mt: 8, mb: 8 }}>
                <Card elevation={6} sx={{ borderRadius: 4 }}>
                    <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 3, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                        <Typography variant="h4" fontWeight={600}>
                            Checkout
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                        {/* Payment Status Radio Buttons */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Simulate Payment Status:
                            </Typography>
                            <Box>
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value="success"
                                        checked={paymentStatus === 'success'}
                                        onChange={() => setPaymentStatus('success')}
                                    />
                                    Success
                                </label>
                                <label style={{ marginLeft: 16 }}>
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value="failure"
                                        checked={paymentStatus === 'failure'}
                                        onChange={() => setPaymentStatus('failure')}
                                    />
                                    Failure
                                </label>
                                <label style={{ marginLeft: 16 }}>
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value="gateway"
                                        checked={paymentStatus === 'gateway'}
                                        onChange={() => setPaymentStatus('gateway')}
                                    />
                                    Gateway Issue
                                </label>

                            </Box>
                        </Box>
                        {/* End Payment Status Radio Buttons */}
                        {localCart.length === 0 ? (
                            <Typography>Your cart is empty.</Typography>
                        ) : (
                            <>
                                <OrderSummary
                                    cartItems={localCart}
                                    total={total}
                                    editable={true}
                                    onQuantityChange={handleQuantityChange}
                                />
                                <CheckoutForm
                                    form={form}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handlePlaceOrder={handlePlaceOrder}
                                />
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>
            {isSubmitted && paymentStatus && (
                <PaymentStatusModal
                    open={true}
                    status={paymentStatus}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
}