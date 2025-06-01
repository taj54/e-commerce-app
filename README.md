# eSalesOne E-Commerce App

A full-stack e-commerce application built with Laravel (PHP) and React (frontend), featuring a checkout flow, order management, and email notifications.

---

## 🚀 Features

- Product listing and cart management
- Checkout with address and payment forms
- Order summary and confirmation
- Order confirmation email (Mailtrap integration)
- Redux for state management
- Responsive UI with Material-UI (MUI)
- Queued email sending

---

## 🛠️ Installation

### 1. **Clone the Repository**

```sh
git clone https://github.com/taj54/e-commerce-app.git
cd e-commerce-app
```

### 2. **Backend Setup (Laravel)**

- Install dependencies:

    ```sh
    composer install
    ```

- Copy `.env.example` to `.env` and set your environment variables:

    ```sh
    cp .env.example .env
    ```

- Generate application key:

    ```sh
    php artisan key:generate
    ```

- Set up your database in `.env` and run migrations:

    ```sh
    php artisan migrate
    ```

- (Optional) Seed the database:

    ```sh
    php artisan db:seed
    ```

- Set up Mailtrap credentials in `.env` for email testing:

    ```
    MAIL_MAILER=smtp
    MAIL_HOST=sandbox.smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=your_mailtrap_username
    MAIL_PASSWORD=your_mailtrap_password
    MAIL_ENCRYPTION=null
    MAIL_FROM_ADDRESS=from@example.com
    MAIL_FROM_NAME="eSalesOne"
    ```

- Start the Laravel server:

    ```sh
    php artisan serve
    ```

- Start the queue worker (for queued emails):

    ```sh
    php artisan queue:work
    ```

---

### 3. **Frontend Setup (React + Vite)**

- Install dependencies:

    ```sh
    npm install
    ```

- Start the development server:

    ```sh
    npm run dev
    ```

---

## 🧑‍💻 Usage

- Visit [http://localhost:8000](http://localhost:8000) to access the app.
- Add products to your cart, proceed to checkout, and place an order.
- Check your Mailtrap inbox for order confirmation emails.

---

## 📦 Project Structure

```
app/
├── Http/
│   └── Controllers/
│   └── Requests/
├── Mail/
│   └── OrderConfirmationMail.php
├── Models/
│   └── Order.php
│   └── OrderItem.php
├── Services/
│   └── OrderService.php
resources/
├── js/
│   └── Pages/
│   └── Components/
│   └── store/
├── views/
│   └── emails/
│       └── order_confirmation.blade.php
```

---

## 📝 Notes

- Make sure your database and Mailtrap credentials are correct.
- The queue worker must be running to send emails.
- For production, configure a real SMTP server and secure environment variables.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT
