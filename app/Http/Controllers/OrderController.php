<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Services\OrderService;
use App\Http\Requests\StoreOrderRequest;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, OrderService $orderService)
    {
        $data = $request->validated();

        $orderResult = $orderService->createOrder($data);

        return Inertia::render('Checkout/Index', [
            'orderResult' => [
                'success' => true,
                'order_number' => $orderResult['order_number'],
                'items' => $orderResult['items'],
                'total' => $orderResult['total'],
                'customer' => $orderResult['customer'],
            ],
        ]);
    }
    
    public function getOrder($slug)
    {
        $order = Order::where('order_number', $slug)->firstOrFail();
        return Inertia::render('ThankYou/Index', [
            'order' => $order->load('items') // eager load items if needed
        ]);
    }
}
