import CreateProductDTO from "../dtos/CreateProductDTO";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  addProduct({ name, category, price, quantity }: CreateProductDTO): Product {
    const product = this.repository.findByName(name);

    if (product) {
      product.quantity = quantity;
      return this.repository.incrementProduct(product);
    }

    const newProduct = new Product({ name, category, price, quantity });
    this.repository.addProduct(newProduct);
    return newProduct;
  }

  removeProduct(name: string) {
    const product = this.repository.findByName(name);

    if (!product) {
      throw new Error("Produto não encontado");
    }

    this.repository.remove(product.name);
  }

  findProductsPerCatergory(category: string) {
    return this.repository.findProductsPerCatergory(category);
  }

  findMoreExpensiveProduct() {
    return this.repository.findMoreExpensiveProduct();
  }

  findAllProductsBellowMinimumStock(minimumStock: number) {
    if (minimumStock < 0) {
      throw new Error("Não é possível pesquisar por um número negativo");
    }

    return this.repository.findAllProductsBellowMinimumStock(minimumStock);
  }
}

export default ProductService;
