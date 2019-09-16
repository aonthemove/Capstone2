import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './product';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });

  it('should get product', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const mockData = [
        new Product("Apples", "Food", "domestic", 1.49, 10),
        new Product("Nike", "Clothes", "domestic", 10.00, 20),
        new Product("Oranges", "Food", "domestic", 5.30, 50),
      ];

      const service: ProductService = TestBed.get(ProductService);
      service.getProduct().subscribe(
        (res: any) => {
          expect(res.length).toEqual(mockData.length);
          expect(res[0].name).toEqual(mockData[0].name);
          expect(res[1].name).toEqual(mockData[1].name);
          expect(res[2].name).toEqual(mockData[2].name);
        });
      const mockReq = httpMock.expectOne("http://localhost:8080/product");
      expect(mockReq.request.method).toEqual("GET");

      mockReq.flush(mockData);
    }));

  it('should add a new product item', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const mockData = new Product("Kale", "Food", "imported", 0.99, 5);

      const service: ProductService = TestBed.get(ProductService);
      service.addProductItem(mockData).subscribe(
        (res: any) => {
          expect(res.name).toEqual(mockData.name);
          expect(res.category).toEqual(mockData.category);
        });

      const mockReq = httpMock.expectOne("http://localhost:8080/product");
      expect(mockReq.request.method).toEqual("POST");
      expect(mockReq.request.body.name).toEqual(mockData.name);
      expect(mockReq.request.body.category).toEqual(mockData.category);

      mockReq.flush(mockData);
    }));

  it('should delete a product item', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const mockData = new Product("Kale", "Food", "imported", 0.99, 5);

      const service: ProductService = TestBed.get(ProductService);
      service.deleteProductItem(1).subscribe(
        (res: any) => {
          expect(res.name).toEqual(mockData.name);
          expect(res.category).toEqual(mockData.category);
        });

      const mockReq = httpMock.expectOne("http://localhost:8080/produce/31");
      expect(mockReq.request.method).toEqual("DELETE");

      mockReq.flush(mockData);
    }));

  it('should update a product item', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const mockData = new Product("Kale", "Food", "imported", 0.99, 5);

      const service: ProductService = TestBed.get(ProductService);
      service.updateProductItem(1, mockData).subscribe(
        (res: any) => {
          expect(res.name).toEqual(mockData.name);
          expect(res.category).toEqual(mockData.category);
        });

      const mockReq = httpMock.expectOne("http://localhost:8080/product/31");
      expect(mockReq.request.method).toEqual("PUT");
      expect(mockReq.request.body.name).toEqual(mockData.name);
      expect(mockReq.request.body.category).toEqual(mockData.category);

      mockReq.flush(mockData);
    }));
});
