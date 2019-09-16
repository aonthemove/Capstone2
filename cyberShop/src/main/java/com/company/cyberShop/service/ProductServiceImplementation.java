package com.company.cyberShop.service;
import com.company.cyberShop.dao.ProductRepository;
import com.company.cyberShop.dto.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductServiceImplementation implements ProductsService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    @Override
    public List<Product> getProductsByName(String name) {

        return productRepository.findByName(name);
    }
    @Override
    public List<Product> getProductsByShipping(String shipping) {

        return productRepository.findByShipping(shipping);
    }
    @Override
    public List<Product> getProductsByCategory(String category) {

        return productRepository.findByCategory(category);
    }
    @Override
    public Product getProductsById(Integer id) {
        return productRepository.getOne(id);
    }

    @Override
    public List<Product> getProductsByPrice(Float price) {

        return productRepository.findByPrice(price);
    }
  /* @Override
    public List<Product> getProductsByPriceRange(Float startPrice, Float endPrice) {
        List<Product> productList = productRepository.findByPriceRange(startPrice, endPrice)
                .stream()
                .filter(product -> product.getPrice().compareTo(startPrice) >= 0 &&
                        product.getPrice().compareTo(endPrice) <= 0 )
                .collect(Collectors.toList());
        return productList;
    }*/
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
    public void updateProduct(Product product, Integer id) {
        if (!product.getId().equals(id)) {
            throw new IllegalArgumentException("Product ID must match the ID provided");
        }
        productRepository.save(product);
    }
    public void purchase(Product[] product) {
        for (Product p : product) {
            Product currProduct = this.getProductsById(p.getId());
            this.updateProduct(currProduct, currProduct.getId());


        }
    }
}
