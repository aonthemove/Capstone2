package com.company.cyberShop.controllers;

import com.company.cyberShop.dto.Product;
import com.company.cyberShop.service.ProductServiceImplementation;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON;

public class ProductControllerTest {
    private MockMvc mockMvc;

    @Mock
    ProductServiceImplementation mockProductServiceImpl;
    @InjectMocks
    ProductController productController;

    private ObjectMapper mapper = new ObjectMapper();


    Product product1;
    Product product2;
    Product product3;

    List<Product> productsList;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build();

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

        productsList = Arrays.asList(product1, product2, product3);
    }
    @Test
    public void rootContext_ShouldRespondWith404() throws Exception {


        mockMvc.perform(get("/"))
                .andExpect(status().isNotFound());

    }

    @Test
    public void ShouldReturnAllProducts() throws Exception {
        when(mockProductServiceImpl.getAllProducts()).thenReturn(productsList);


        mockMvc.perform(get("/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name", is(productsList.get(0).getName())));

        verify(mockProductServiceImpl).getAllProducts();

    }
    @Test
    public void shouldAddProduct() throws Exception {
        Product inputProduct = new Product();
        inputProduct.setName("strawberries");
        inputProduct.setPrice(2.00f);
        inputProduct.setCategory("Food");
        inputProduct.setShipping("domestic");


        String inputJson = mapper.writeValueAsString(inputProduct);

        Product outputProduct = new Product();
        outputProduct.setName("strawberries");
        outputProduct.setPrice(2.00f);
        outputProduct.setCategory("Food");
        outputProduct.setShipping("domestic");
        outputProduct.setId(1);

        String outputJson = mapper.writeValueAsString(outputProduct);

        when(mockProductServiceImpl.addProduct(inputProduct)).thenReturn(outputProduct);

        mockMvc.perform(MockMvcRequestBuilders.post("/product")
                .contentType(MediaType.APPLICATION_JSON)
                .content(inputJson)
        ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(outputJson));
    }

  /*  @Test
    public void ShouldUpdateProduce() throws Exception {
        Product product = new Product();
        product.setName("oranges");
        product.setCategory("Food");
        product.setPrice(1.00f);
        product.setShipping("imported");

        String inputJson = mapper.writeValueAsString(product);
        String outputJson = mapper.writeValueAsString(product);

        MvcResult result = mockMvc.perform(put("/product/" + product.getId())
                .content(inputJson)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json(outputJson));

        // result.getResolvedException().printStackTrace();

        verify(mockProductServiceImpl).updateProduct(product, 31);
    }*/

    @Test
    public void ShouldDeleteProduct() throws Exception {
        MvcResult result = mockMvc.perform(delete("/product/1"))
                .andExpect(status().isOk()).andReturn();

        // result.getResolvedException().printStackTrace();

        verify(mockProductServiceImpl).deleteProduct(1);
    }

}