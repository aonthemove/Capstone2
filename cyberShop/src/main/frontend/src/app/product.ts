export class Product {
    id: number;
    name: String;
    category: String;
    shipping: String;
    price: number;
    tax: number;
    duty: number;
    quantity: number;
    available: number;
    image: String;

    constructor(name: String, category: String, shipping: String, price: number, quantity: number, tax?: number, duty?: number, available?: number, image?: String) {
        this.name = name;
        this.category = category;
        this.shipping = shipping;
        this.price = price;
        this.quantity = quantity;
        this.available = available;
        this.image = image;
        if (this.category == 'Music' || this.category == 'Luxury Items' || this.category == 'Clothes') {
            this.tax = .10;
        }

        if (this.category == 'Medical' || this.category == 'Book' || this.category == 'Food') {
            this.tax = 0;
        }
        if (this.shipping == 'imported') {
            this.duty = .05;
        }
        if (this.shipping == 'domestic') {
            this.duty = 0;
        }
    }
}
