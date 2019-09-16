package com.company.cyberShop.dao;
import com.company.cyberShop.dto.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Integer> {
    List<Product> findByName(String name);
    List<Product> findByShipping(String shipping);
    List<Product> findByPrice(Float price);
    List<Product> findByCategory(String category);
   // List<Product> findByPriceRange(Float StartPrice, Float endPrice);

}
