import { beforeAll, beforeEach, describe, expect, test } from "@jest/globals";
import ProductRepository from "../src/repositories/ProductRepository";
import inventory from "../mocks/inventory";
import Product from "../src/entities/Product";

describe("ProductRepository Test Suite", () => {
  let repo: ProductRepository;

  beforeAll(() => {
    repo = new ProductRepository();
    (repo as any).inventory = inventory;
  });

  test("should return 0 when inventory is empty", () => {
    // const repo = new ProductRepository();

    expect(repo.getAll().length).toBe(20);
  });

  test("findByName", () => {
    expect(repo.findByName("Calça Adidas")).toEqual({
      name: "Calça Adidas",
      category: "Calça",
      price: 420,
      quantity: 35,
    });
  });

  test("findByName: undefined", () => {
    expect(repo.findByName("Camiseta Caxias")).toBe(null);
  });

  test("addProduct", () => {
    repo.addProduct(
      new Product({
        name: "Camiseta Juventude",
        category: "Camiseta",
        price: 199.9,
        quantity: 25,
      }),
    );

    expect(repo.findByName("Camiseta Juventude")).toEqual({
      name: "Camiseta Juventude",
      category: "Camiseta",
      price: 199.9,
      quantity: 25,
    });
  });

  test("updateProductQuantity", () => {
    const product = repo.findByName("Camiseta Internacional")!;
    expect(product.quantity).toBe(100);
    product.quantity = 125;
    const newProduct = repo.updateProductQuantity(product);
    expect(newProduct.quantity).toBe(125);
  });

  test("removeProduct", () => {
    repo.remove("Camiseta Juventude");

    expect(repo.findByName("Camiseta Juventude")).toBeFalsy();
  });

  test("findProductPerCategory", () => {
    const products = repo.findProductsPerCatergory("Jaqueta");

    expect(products.length).toBe(2);
    expect(products).toEqual([
      [
        "Jaqueta Corinthians",
        {
          name: "Jaqueta Corinthians",
          category: "Jaqueta",
          price: 550,
          quantity: 20,
        },
      ],
      [
        "Jaqueta Fluminense",
        {
          name: "Jaqueta Fluminense",
          category: "Jaqueta",
          price: 525,
          quantity: 15,
        },
      ],
    ]);
  });

  test("findMoreExpensiveProduct", () => {
    expect(repo.findMoreExpensiveProduct()).toEqual({
      category: "Jaqueta",
      name: "Jaqueta Corinthians",
      price: 550,
      quantity: 20,
    });
  });

  test("findAllProductsBellowMinimumStock", () => {
    expect(repo.findAllProductsBellowMinimumStock(25)).toEqual([
      [
        "Jaqueta Corinthians",
        {
          category: "Jaqueta",
          name: "Jaqueta Corinthians",
          price: 550,
          quantity: 20,
        },
      ],
      [
        "Jaqueta Fluminense",
        {
          category: "Jaqueta",
          name: "Jaqueta Fluminense",
          price: 525,
          quantity: 15,
        },
      ],
      [
        "Tênis Under Armour",
        {
          category: "Calçado",
          name: "Tênis Under Armour",
          price: 520,
          quantity: 20,
        },
      ],
    ]);
  });

  test("findMoreExpensiveProduct:emptyInventory", () => {
    (repo as any).inventory = {};
    expect(() => repo.findMoreExpensiveProduct()).toThrow(
      "Inventário está vazio",
    );
  });
});
