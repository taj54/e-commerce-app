import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PaymentSuccess from './Partials/PaymentSuccess';
import PaymentFailure from './Partials/PaymentFailure';
import PaymentGatewayIssue from './Partials/PaymentGatewayIssue';

export default function PaymentStatusModal({ open, status, onClose }) {
    // status: 'success' | 'failure' | 'gateway'
    let Content = null;
    if (status === 'success') {
        Content = <PaymentSuccess />;
    } else if (status === 'failure') {
        Content = <PaymentFailure />;
    } else if (status === 'gateway') {
        Content = <PaymentGatewayIssue />;
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{
            sx: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
        }} >
            <DialogContent>
                {Content}
            </DialogContent>
        </Dialog>
    );
}