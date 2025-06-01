<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Mail;

class OrderService
{
    public function createOrder(array $data)
    {
        // Generate unique order number
        $orderNumber = Order::generateOrderNumber();

        // Create order
        $order = Order::create([
            'order_number' => $orderNumber,
            'customer_name' => $data['customer']['fullName'],
            'customer_email' => $data['customer']['email'],
            'customer_phone' => $data['customer']['phone'],
            'customer_address' => $data['customer']['address'],
            'customer_city' => $data['customer']['city'],
            'customer_state' => $data['customer']['state'],
            'customer_zip' => $data['customer']['zip'],
            'total' => $data['total'],
        ]);

        // Create order items and update inventory
        foreach ($data['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'variant' => $item['variant'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
            // Update product inventory
            Product::where('id', $item['id'])->decrement('inventory', $item['quantity']);
        }

        $orderResult = [
            'order' => $order,
            'order_number' => $orderNumber,
            'items' => $data['items'],
            'total' => $data['total'],
            'customer' => $data['customer'],
        ];

        // Send confirmation email (queued)
        Mail::to($data['customer']['email'])->queue(new OrderConfirmationMail($orderResult));

        return $orderResult;
    }
}