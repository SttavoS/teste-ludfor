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
    console.log("Iniciando...");
  }

  private showMenu() {
    console.log(`
==== SISTEMA DE GERENCIAMENTO DE INVENTÁRIO ====
1. Adicionar/Atualizar Produto
2. Remover Produto
3. Buscar Produtos por Categoria
4. Encontrar Produto Mais Caro
5. Listar Produtos Abaixo do Estoque Mínimo
6. Exibir Todo o Inventário
7. Sair
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
        // case "6":
        //   this.repository.exibirInventario();
        //   this.init();
        //   break;
        case "7":
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
            try {
              this.service.addProduct({
                name,
                category,
                price: parseFloat(price),
                quantity: parseInt(quantity),
              });
              console.log(`Produto ${name} adicionado ao inventário.`);
            } catch (error) {
              console.error(error.message);
            }
            this.init();
          });
        });
      });
    });
  }

  removeProductCommand() {
    this.io.question("Nome do Produto a Remover: ", (name) => {
      try {
        this.service.removeProduct(name);
        console.log(`Produto ${name} removido do inventário.`);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.init();
      }
    });
  }

  findProductsPerCategoryCommand() {
    this.io.question("Categoria para Busca: ", (categoria) => {
      const produtos = this.repository.buscarPorCategoria(categoria);
      console.log("Produtos na Categoria:");
      produtos.forEach((produto) => {
        console.log(`
Nome: ${produto.nome}
Categoria: ${produto.categoria}
Preço: R$ ${produto.preco.toFixed(2)}
Quantidade: ${produto.quantidade}
-------------------`);
      });
      this.init();
    });
  }

  findMoreExpensiveProductCommand() {
    try {
      const produtoMaisCaro = this.repository.encontrarProdutoMaisCaro();
      console.log(`Produto Mais Caro:
Nome: ${produtoMaisCaro.nome}
Preço: R$ ${produtoMaisCaro.preco.toFixed(2)}`);
    } catch (error) {
      console.error(error.message);
    }
    this.init();
  }

  findAllProductsBellowMinimumStockCommand() {
    this.io.question("Estoque Mínimo: ", (estoqueMinimo) => {
      const produtosBaixoEstoque = this.repository.produtosAbaixoEstoqueMinimo(
        parseInt(estoqueMinimo),
      );
      console.log("Produtos Abaixo do Estoque Mínimo:");
      produtosBaixoEstoque.forEach((produto) => {
        console.log(`
Nome: ${produto.nome}
Categoria: ${produto.categoria}
Preço: R$ ${produto.preco.toFixed(2)}
Quantidade: ${produto.quantidade}
-------------------`);
      });
      this.init();
    });
  }
}

export default Menu;
