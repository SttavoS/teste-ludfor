import path, { join, resolve } from "node:path";
import PLD from "./PLD.js";
import { fileURLToPath } from "node:url";
import util from "node:util";

(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // const filePath = join(__dirname, "../files", "PLD.xlsx");
  const filePath = join(__dirname, "../files", "PLD2.xlsx");
  // const filePath = join(__dirname, "../files", "planilha-teste.xlsx");

  const result = PLD.execute(filePath);

  console.log(util.inspect(result, { depth: 4, colors: true }));
})();
