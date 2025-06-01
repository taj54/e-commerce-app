<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;

class HomeController extends Controller
{
  public function __construct() {}
  public function index()
  {
    $products = Product::all();
    return inertia::render('Home/Index', [
      'title' => 'Home',
      'products' => $products
    ]);
  }
  public function thankYou(Order $order)
  {
    return inertia('ThankYou/Index', [
        'title' => 'Thank You',
        'order' => $order->load('items') // eager load items if needed
    ]);
  }
}
