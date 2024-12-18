import * as readline from "node:readline";
import ProductService from "./services/ProductService";

class Menu {
  private service: ProductService;
  private io: readline.Interface;

  constructor() {
    this.service = new ProductService();
    this.io = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  init() {
    this.showMenu();
    this.processOption();
  }

  private showMenu() {
    console.log(`
==== SISTEMA DE GERENCIAMENTO DE INVENTÁRIO ====
1. Adicionar/Atualizar Produto
2. Remover Produto
3. Buscar Produtos por Categoria
4. Encontrar Produto Mais Caro
5. Listar Produtos Abaixo do Estoque Mínimo
6. Sair
`);
  }

  private processOption() {
    this.io.question("Escolha uma opção: ", (option) => {
      switch (option) {
        case "1":
          this.addProductCommand();
          break;
        case "2":
          this.removeProductCommand();
          break;
        case "3":
          this.findProductsPerCategoryCommand();
          break;
        case "4":
          this.findMoreExpensiveProductCommand();
          break;
        case "5":
          this.findAllProductsBellowMinimumStockCommand();
          break;
        case "6":
          console.log("Saindo do sistema...");
          this.io.close();
          return;
        default:
          console.log("Opção inválida. Tente novamente.");
          this.init();
      }
    });
  }

  addProductCommand() {
    this.io.question("Nome do Produto: ", (name) => {
      this.io.question("Categoria: ", (category) => {
        this.io.question("Preço: ", (price) => {
          this.io.question("Quantidade: ", (quantity) => {
            const product = this.service.addProduct({
              name,
              category,
              price: parseFloat(price),
              quantity: parseInt(quantity),
            });
            console.log(`Produto ${product.name} adicionado ao inventário.`);

            this.init();
          });
        });
      });
    });
  }

  removeProductCommand() {
    this.io.question("Nome do Produto a Remover: ", (name) => {
      this.service.removeProduct(name);
      console.log(`Produto ${name} removido do inventário.`);

      this.init();
    });
  }

  findProductsPerCategoryCommand() {
    this.io.question("Categoria para Busca: ", (category) => {
      const produtos = this.service.findProductsPerCatergory(category);
      console.log("Produtos na Categoria:");
      produtos.forEach(([_, product]) => {
        console.log(product.toString());
        console.log("-----------------------------");
      });
      this.init();
    });
  }

  findMoreExpensiveProductCommand() {
    const product = this.service.findMoreExpensiveProduct();
    console.log("Produto Mais Caro:");
    console.log(`${product.name} | ${product.formatedPrice()}`);
    this.init();
  }

  findAllProductsBellowMinimumStockCommand() {
    this.io.question("Estoque Mínimo: ", (minimum) => {
      const products = this.service.findAllProductsBellowMinimumStock(
        parseInt(minimum),
      );
      console.log("Produtos Abaixo do Estoque Mínimo:");
      products.forEach(([_, product]) => {
        console.log(product.toString());
        console.log("-----------------------------");
      });
      this.init();
    });
  }
}

export default Menu;
