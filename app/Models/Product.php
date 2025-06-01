<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'variants',
        'variantType',
        'variantPrices',
        'inventory',
    ];

    protected $casts = [
        'variants' => 'array',
        'variantPrices' => 'array',
    ];
}
