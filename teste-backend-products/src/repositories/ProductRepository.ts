import CreateProductDTO from "../dtos/CreateProductDTO";
import Product from "../entities/Product";

class ProductRepository {
  private inventory: any;

  constructor() {
    this.inventory = {};
  }

  findByName(name: string) {
    if (!this.inventory[name]) {
      throw new Error(`Produto ${name} não encontrado`);
    }

    return new Product(this.inventory[name]);
  }

  addProduct(product: Product) {
    this.inventory[product.name] = product;
  }

  incrementProduct(product: Product): Product {
    this.inventory[product.name] += product.currentStock();

    return this.inventory[product.name];
  }

  remove(name: string) {
    delete this.inventory[name];
  }

  // Buscar produtos por categoria
  buscarPorCategoria(categoria) {
    const produtosCategoria = Object.entries(this.inventory)
      .filter(([nome, produto]) => produto.categoria === categoria)
      .map(([nome, produto]) => ({ nome, ...produto }));

    return produtosCategoria;
  }

  // Encontrar produto mais caro
  encontrarProdutoMaisCaro() {
    if (Object.keys(this.inventory).length === 0) {
      throw new Error("Inventário está vazio");
    }

    return Object.entries(this.inventory).reduce(
      (max, [nome, produto]) =>
        produto.preco > max.preco ? { nome, preco: produto.preco } : max,
      { nome: "", preco: -Infinity },
    );
  }

  // Produtos abaixo do estoque mínimo
  produtosAbaixoEstoqueMinimo(estoqueMinimo) {
    return Object.entries(this.inventory)
      .filter(([nome, produto]) => produto.quantidade < estoqueMinimo)
      .map(([nome, produto]) => ({ nome, ...produto }));
  }

  // Exibir todo o inventário
  exibirInventario() {
    console.log("Inventário Atual:");
    Object.entries(this.inventory).forEach(([nome, produto]) => {
      console.log(`
Nome: ${nome}
Categoria: ${produto.categoria}
Preço: R$ ${produto.preco.toFixed(2)}
Quantidade: ${produto.quantidade}
-------------------`);
    });
  }
}

export default ProductRepository;
