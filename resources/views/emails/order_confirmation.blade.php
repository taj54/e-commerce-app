<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f6f6f6;
            margin: 0;
            padding: 0;
        }
        .container {
            background: #fff;
            max-width: 600px;
            margin: 30px auto;
            padding: 32px 24px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        h2 {
            color: #1976d2;
            margin-bottom: 16px;
        }
        .order-info, .customer-info {
            margin-bottom: 18px;
        }
        .order-info strong, .customer-info strong {
            color: #333;
        }
        ul {
            padding-left: 18px;
        }
        .footer {
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #eee;
            color: #888;
            font-size: 14px;
            text-align: center;
        }
        .company {
            font-weight: bold;
            color: #1976d2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Thank you for your order!</h2>
        <div class="order-info">
            <p>Order Number: <strong>{{ $orderResult['order_number'] }}</strong></p>
            <p>Total: <strong>${{ $orderResult['total'] }}</strong></p>
        </div>
        <div class="customer-info">
            <p>Customer: <strong>{{ $orderResult['customer']['fullName'] }}</strong></p>
            <p>Email: <strong>{{ $orderResult['customer']['email'] }}</strong></p>
            <p>Phone: <strong>{{ $orderResult['customer']['phone'] }}</strong></p>
            <p>Address:</p>
            <p>
                {{ $orderResult['customer']['address'] }}<br>
                {{ $orderResult['customer']['city'] }}, {{ $orderResult['customer']['state'] }} {{ $orderResult['customer']['zip'] }}
            </p>
        </div>
        <div>
            <p>Items:</p>
            <ul>
                @foreach($orderResult['items'] as $item)
                    <li>{{ $item['name'] }} x {{ $item['quantity'] }} - ${{ $item['price'] }}</li>
                @endforeach
            </ul>
        </div>
        <div class="footer">
            <p>We appreciate your business and hope you enjoy your purchase!</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p class="company">eComerce Team</p>
        </div>
    </div>
</body>
</html>
