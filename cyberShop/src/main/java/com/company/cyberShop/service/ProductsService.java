package com.company.cyberShop.service;
import com.company.cyberShop.dto.Product;

import java.util.List;

public interface ProductsService {
    List<Product> getAllProducts();
    Product getProductsById(Integer id);
    List<Product> getProductsByName(String name);
    List<Product> getProductsByShipping(String shipping);
    List<Product> getProductsByCategory(String category);
    List<Product> getProductsByPrice(Float price);
   // List<Product> getProductsByPriceRange(Float startPrice, Float endPrice);
}
