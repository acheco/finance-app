<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
  public function run(): void
  {
    $systemSuppliers = [
      'Subscriptions' => [
        ['name' => 'Netflix', 'domain' => 'netflix.com'],
        ['name' => 'Spotify', 'domain' => 'spotify.com'],
        ['name' => 'Disney+', 'domain' => 'disneyplus.com'],
        ['name' => 'Amazon Prime', 'domain' => 'amazon.com'],
        ['name' => 'HBO Max', 'domain' => 'hbomax.com'],
      ],
      'Groceries' => [
        ['name' => 'Walmart', 'domain' => 'walmart.com'],
        ['name' => 'Costco', 'domain' => 'costco.com'],
        ['name' => 'Carrefour', 'domain' => 'carrefour.com'],
        ['name' => 'Tesco', 'domain' => 'tesco.com'],
        ['name' => 'Whole Foods', 'domain' => 'wholefoodsmarket.com'],
      ],
      'Restaurants' => [
        ['name' => 'McDonald\'s', 'domain' => 'mcdonalds.com'],
        ['name' => 'Starbucks', 'domain' => 'starbucks.com'],
        ['name' => 'Burger King', 'domain' => 'burgerking.com'],
        ['name' => 'Subway', 'domain' => 'subway.com'],
        ['name' => 'Domino\'s Pizza', 'domain' => 'dominos.com'],
      ],
      'Internet & Phone' => [
        ['name' => 'AT&T', 'domain' => 'att.com'],
        ['name' => 'Verizon', 'domain' => 'verizon.com'],
        ['name' => 'Vodafone', 'domain' => 'vodafone.com'],
        ['name' => 'Movistar', 'domain' => 'movistar.com'],
        ['name' => 'T-Mobile', 'domain' => 't-mobile.com'],
      ],
      'Public Transport' => [
        ['name' => 'Uber', 'domain' => 'uber.com'],
        ['name' => 'Lyft', 'domain' => 'lyft.com'],
        ['name' => 'Cabify', 'domain' => 'cabify.com'],
        ['name' => 'Airbnb', 'domain' => 'airbnb.com'],
        ['name' => 'Booking.com', 'domain' => 'booking.com'],
      ],
      'Shopping' => [
        ['name' => 'Amazon', 'domain' => 'amazon.com'],
        ['name' => 'eBay', 'domain' => 'ebay.com'],
        ['name' => 'Apple Store', 'domain' => 'apple.com'],
        ['name' => 'Zara', 'domain' => 'zara.com'],
        ['name' => 'IKEA', 'domain' => 'ikea.com'],
      ],
      'Gas & Fuel' => [
        ['name' => 'Shell', 'domain' => 'shell.com'],
        ['name' => 'BP', 'domain' => 'bp.com'],
        ['name' => 'Chevron', 'domain' => 'chevron.com'],
        ['name' => 'ExxonMobil', 'domain' => 'exxonmobil.com'],
        ['name' => 'TotalEnergies', 'domain' => 'totalenergies.com'],
      ],
      'Education' => [
        ['name' => 'Coursera', 'domain' => 'coursera.org'],
        ['name' => 'Udemy', 'domain' => 'udemy.com'],
        ['name' => 'Duolingo', 'domain' => 'duolingo.com'],
        ['name' => 'LinkedIn Learning', 'domain' => 'linkedin.com'],
        ['name' => 'MasterClass', 'domain' => 'masterclass.com'],
      ],
    ];

    foreach ($systemSuppliers as $categoryName => $suppliers) {
      $category = Category::where('name', $categoryName)->first();

      if ($category) {
        foreach ($suppliers as $supplierData) {
          Supplier::updateOrCreate(
            ['name' => $supplierData['name'], 'user_id' => null],
            [
              'category_id' => $category->id,
              'logo' => "https://img.logo.dev/{$supplierData['domain']}?token=pk_FtkeJcj3QGmf6icSYuf67A",
              'email' => "support@{$supplierData['domain']}",
              'is_active' => true,
            ]
          );
        }
      }
    }
  }
}