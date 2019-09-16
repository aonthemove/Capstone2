package com.company.cyberShop.dao;

import com.company.cyberShop.dto.Product;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductRepositoryTest {
// NOT GOING TO DEMO TEST AS THE DATA IS NOT MOCK-DATA AND WILL AFFECT MY DATABASE
    @Autowired
    ProductRepository productRepository;

    Product product1;
    Product product2;
    Product product3;

    @Before
    public void setUp() {

        productRepository.deleteAll();

        product1 = new Product();
        product1.setName("notebook");
        product1.setPrice(2.00f);
        product1.setShipping("domestic");
        product1.setCategory("Books");

        product2 = new Product();
        product2.setName("ace bandage");
        product2.setPrice(10.00f);
        product2.setShipping("imported");
        product2.setCategory("Medical");

        product3 = new Product();
        product3.setName("Astroworld- Travis Scott");
        product3.setPrice(10.00f);
        product3.setShipping("imported");
        product3.setCategory("Music");
    }
        @Test
        @Transactional
        public void shouldAddProduct() {
            productRepository.save(product1);
            productRepository.save(product2);
            productRepository.save(product3);

            assertNotNull(product1.getId());
            assertNotNull(product2.getId());
            assertNotNull(product3.getId());
        }
    @Test
    @Transactional
    public void shouldGetProduct() {

        productRepository.save(product1);
        productRepository.save(product2);
        productRepository.save(product3);


        Set<Product> productSet = new HashSet<>();
        productSet.add(product1);
        productSet.add(product2);
        productSet.add(product3);

        List<Product> fromRepo = productRepository.findAll();

        assertEquals(product1, fromRepo.get(0));
        assertEquals(product2, fromRepo.get(1));
        assertEquals(product3, fromRepo.get(2));


    }

}