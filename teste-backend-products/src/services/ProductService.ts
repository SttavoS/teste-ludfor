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

    if (!product) {
      const newProduct = new Product({ name, category, price, quantity });
      this.repository.addProduct(newProduct);
      return newProduct;
    }

    return this.repository.incrementProduct(product);
  }

  removeProduct(name: string) {
    const product = this.repository.findByName(name);

    this.repository.remove(product.name);
  }
}

export default ProductService;
