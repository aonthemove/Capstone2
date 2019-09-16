package com.company.cyberShop.controllers;
import com.company.cyberShop.dto.Product;
import com.company.cyberShop.service.ProductServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductController {
    @Autowired
    ProductServiceImplementation productService;
    // import service

    @GetMapping(value = "/product")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    //return all products in the database

    @GetMapping(value = "/name/{name}")
    public List<Product> getProductsByName(@PathVariable String name) {
        return productService.getProductsByName(name);
    }
    //search products in the database by name

    @GetMapping(value = "/shipping/{shipping}")
    public List<Product> getProductsByShipping(@PathVariable String shipping) {
        return productService.getProductsByShipping(shipping);
    }

    //search products by shipping
    @GetMapping(value = "/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }
    //search products by the category

    @GetMapping(value = "/id/{id}")
    public Product getProductsById(@PathVariable Integer id) {
        return productService.getProductsById(id);
    }

    //search products in the database by product id
    @GetMapping(value = "/price/{price}")
    public List<Product> getProductsByPrice(@PathVariable Float price) {
        return productService.getProductsByPrice(price);
    }

    //search products in the database by price
    @PostMapping(value = "/product")
    public Product addProduct(@RequestBody @Valid Product product) {
        return productService.addProduct(product);
    }
    //add a new product to the database

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
    public void updateProduct(@RequestBody @Valid Product product, @PathVariable Integer id) {
        productService.updateProduct(product, id);
    }
    //update a product in the database

    @RequestMapping(value = "/product/{id}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }
    //delete a product from the database
    @RequestMapping(value = "/purchase", method = RequestMethod.POST)
    public void purchase(@RequestBody @Valid Product[] product) {
        productService.purchase(product);
    }

}


   /* @GetMapping(value = "/product/{startPrice}/{endPrice}")
    public  List<Product> getProductsByPriceRange(@PathVariable Float startPrice,
                                                            @PathVariable Float endPrice) {
        if (startPrice < 0.00f || endPrice < 0.00f) {
            throw new IllegalArgumentException("Start and end price must be greater than 0");
        }

        return productService.getProductsByPriceRange(startPrice, endPrice);
    }*/


