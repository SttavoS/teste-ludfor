import CreateProductDTO from "../dtos/CreateProductDTO";
import Product from "../entities/Product";

interface Inventory {
  [key: string]: Product;
}

class ProductRepository {
  private inventory: Inventory;

  constructor() {
    this.inventory = {};
  }

  getAll() {
    return Object.entries(this.inventory).map(([_, product]) => ({
      ...product,
    }));
  }

  findByName(name: string) {
    if (!this.inventory[name]) {
      return null;
    }

    return this.inventory[name];
  }

  addProduct(product: Product) {
    this.inventory[product.name] = product;
  }

  incrementProduct(product: Product): Product {
    this.inventory[product.name].quantity = product.quantity;

    return this.inventory[product.name];
  }

  remove(name: string) {
    delete this.inventory[name];
  }

  findProductsPerCatergory(category: string) {
    return Object.entries(this.inventory).filter(
      ([_, product]) => product.category === category,
    );
  }

  findMoreExpensiveProduct() {
    if (Object.keys(this.inventory).length === 0) {
      throw new Error("Inventário está vazio");
    }

    return Object.entries(this.inventory).reduce(
      (expesiveProduct, [_, product]) => {
        return product.price > expesiveProduct.price
          ? product
          : expesiveProduct;
      },
      { name: "", price: 0 } as Product,
    );
  }

  findAllProductsBellowMinimumStock(minimum: number) {
    return Object.entries(this.inventory).filter(
      ([_, product]) => product.quantity < minimum,
    );
  }
}

export default ProductRepository;
