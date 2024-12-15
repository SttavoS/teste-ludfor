import { beforeEach, describe, expect, test } from "@jest/globals";
import Stack from "../src/Stack";

describe("Stack Suite Test", () => {
  test("append", () => {
    const stack = new Stack<number>();

    stack.append(1);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
  });

  test("pop", () => {
    const stack = new Stack<string>();

    stack.append("banana");
    stack.append("abacaxi");
    stack.append("maça");

    expect(stack.pop()).toBe("maça");
    expect(stack.pop()).toBe("abacaxi");
  });

  test("peek", () => {
    const stack = new Stack<number>();

    stack.append(54);
    expect(stack.peek()).toBe(54);
    stack.append(22);
    expect(stack.peek()).toBe(22);
    stack.append(96);
    expect(stack.peek()).toBe(96);
  });

  test("isEmpty", () => {
    const stack = new Stack<number>();

    expect(stack.isEmpty()).toBe(true);
    stack.append(11);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });

  test("size", () => {
    const stack = new Stack<string>();

    stack.append("Entrecot");
    expect(stack.size()).toBe(1);
    stack.append("Picanha");
    expect(stack.size()).toBe(2);
    stack.append("Filé Mignon");
    expect(stack.size()).toBe(3);
  });
});
