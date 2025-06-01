<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = json_decode(file_get_contents(resource_path('./products.json')), true);

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'image' => $product['image'],
                'variants' => $product['variants'],
                'variantType' => $product['variantType'],
                'variantPrices' => $product['variantPrices'],
                'inventory' => 100, // or set as needed
            ]);
        }
    }
}