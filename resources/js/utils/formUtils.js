// Checks if expiry date is in the future (MM/YY or MM/YYYY)
export function isFutureDate(expiry) {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    const expMonth = parseInt(month, 10);
    let expYear = parseInt(year, 10);
    if (expYear < 100) expYear += 2000;
    const now = new Date();
    const expDate = new Date(expYear, expMonth - 1, 1);
    return expDate > new Date(now.getFullYear(), now.getMonth(), 1);
}

// Validates checkout form fields
export function validateCheckoutForm(form) {
    const errs = {};
    if (!form.fullName) errs.fullName = 'Full Name is required';
    if (!form.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.phone || !/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) errs.phone = 'Valid phone required';
    if (!form.address) errs.address = 'Address is required';
    if (!form.city) errs.city = 'City is required';
    if (!form.state) errs.state = 'State is required';
    if (!form.zip || !/^\d{4,10}$/.test(form.zip)) errs.zip = 'Valid zip required';
    if (!form.cardNumber || !/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) errs.cardNumber = '16-digit card required';
    if (!form.expiry || !/^(0[1-9]|1[0-2])\/\d{2,4}$/.test(form.expiry) || !isFutureDate(form.expiry)) errs.expiry = 'Valid future expiry required';
    if (!form.cvv || !/^\d{3}$/.test(form.cvv)) errs.cvv = '3-digit CVV required';
    return errs;
}