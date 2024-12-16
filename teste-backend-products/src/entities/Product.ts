import CreateProductDTO from "../dtos/CreateProductDTO";

class Product {
  name: string;
  category: string;
  price: number;
  private quantity: number;

  constructor({ name, category, price, quantity }: CreateProductDTO) {
    if (!name || !category || price <= 0) {
      throw new Error("Dados de produto inválidos");
    }

    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = 1;
  }

  currentStock() {
    this.quantity;
  }

  updateStock(amount: number) {
    this.quantity += amount;
  }
}

export default Product;
