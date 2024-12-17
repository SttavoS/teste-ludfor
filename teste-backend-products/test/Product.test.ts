import { describe, expect, test } from "@jest/globals";
import Product from "../src/entities/Product";

describe("Product Test Suite", () => {
  test("should retrieve a instance with valid data", () => {
    const product = new Product({
      name: "Tênis Adidas",
      category: "Calçado",
      price: 400.0,
      quantity: 339,
    });

    expect(product.name).toBe("Tênis Adidas");
    expect(product.category).toBe("Calçado");
    expect(product.price).toBe(400.0);
    expect(product.quantity).toBe(339);
  });

  test("should throw an error with invalid data", () => {
    expect(
      () =>
        new Product({
          name: "",
          category: "",
          price: 0,
          quantity: -2,
        })
    ).toThrow("Dados de produto inválidos");
  });

  test("should return the formatted price", () => {
    const product = new Product({
      name: "Tênis Nike",
      category: "Calçado",
      price: 899.5,
      quantity: 1000,
    });

    expect(product.formatedPrice()).toBe("R$ 899,50");
  });

  test("should return the product in a string", () => {
    const product = new Product({
      name: "Camiseta Internacional",
      category: "Camiseta",
      price: 349.5,
      quantity: 125,
    });

    expect(product.toString()).toBe(`
Nome: Camiseta Internacional
Categoria: Camiseta
Preço: R$ 349,50
Quantidade: 125 
    `);
  });
});
