import CreateProductDTO from "../dtos/CreateProductDTO";

class Product {
  name: string;
  category: string;
  price: number;
  quantity: number;

  constructor({ name, category, price, quantity }: CreateProductDTO) {
    if (!name || !category || price <= 0 || quantity < 0) {
      throw new Error("Dados de produto inválidos");
    }

    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  formatedPrice() {
    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(this.price);
  }

  toString() {
    return `
Nome: ${this.name}
Categoria: ${this.category}
Preço: ${this.formatedPrice()}
Quantidade: ${this.quantity} 
    `;
  }
}

export default Product;
