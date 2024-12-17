import Menu from "./Menu";

try {
  const menu = new Menu();
  menu.init();
} catch (error) {
  console.error((error as Error).message);
}
