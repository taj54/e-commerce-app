<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'customer_city',
        'customer_state',
        'customer_zip',
        'total',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    public static function generateOrderNumber()
    {
        return 'ORD-' . strtoupper(Str::random(8));
    }
}
