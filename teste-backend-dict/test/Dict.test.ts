import { describe, expect, test } from "@jest/globals";
import Dict from "../src/Dict";

describe("Dict Suite Test", () => {
  test("given a list of words and return a dictionary with the count of each word", () => {
    expect(
      Dict.execute(["apple", "banana", "apple", "orange", "banana", "banana"]),
    ).toStrictEqual({ apple: 2, banana: 3, orange: 1 });
  });
});
