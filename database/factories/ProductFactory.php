<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        // Example variants and prices for demonstration
        $variantTypes = [
            ['type' => 'Size', 'variants' => ['Small', 'Medium', 'Large', 'X-Large']],
            ['type' => 'Color', 'variants' => ['Black', 'Silver', 'Rose Gold']],
            ['type' => 'Volume', 'variants' => ['500ml', '750ml', '1000ml']],
            ['type' => 'Material/Color', 'variants' => ['Black Mesh', 'Grey Fabric']],
            ['type' => 'Form', 'variants' => ['Whole Bean', 'Ground']],
        ];
        $variantSet = $this->faker->randomElement($variantTypes);
        $variants = $variantSet['variants'];
        $variantType = $variantSet['type'];

        // Generate variantPrices
        $basePrice = $this->faker->numberBetween(10, 200);
        $variantPrices = [];
        foreach ($variants as $i => $variant) {
            $variantPrices[$variant] = $basePrice + ($i * $this->faker->numberBetween(2, 20));
        }

        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(12),
            'price' => $basePrice,
            'image' => $this->faker->imageUrl(600, 400, 'product', true),
            'variants' => $variants,
            'variantType' => $variantType,
            'variantPrices' => $variantPrices,
            'inventory' => $this->faker->numberBetween(10, 100),
        ];
    }
}