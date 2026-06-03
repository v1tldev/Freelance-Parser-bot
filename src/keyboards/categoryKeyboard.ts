import { InlineKeyboard } from "grammy";
import { devSubcategories } from "../consts/categoriesData";

const BUTTONS_PER_ROW = 2;
const ITEMS_PER_PAGE = 6;

export function getSubcategoriesKeyboard(page: number = 0): InlineKeyboard {
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = devSubcategories.slice(start, end);
  
  const keyboard = new InlineKeyboard();

  for (let i = 0; i < pageItems.length; i += BUTTONS_PER_ROW) {
    const rowItems = pageItems.slice(i, i + BUTTONS_PER_ROW);
    const rowButtons = rowItems.map(item => 
      InlineKeyboard.text(item.name, `analyze:${process.env.BASE_URL}${item.path}`)
    );
    keyboard.row(...rowButtons);
  }
  
  const navButtons = [];
  if (page > 0) {
    navButtons.push({ text: "◀️ Назад", data: `page:${page - 1}` });
  }
  if (end < devSubcategories.length) {
    navButtons.push({ text: "Вперёд ▶️", data: `page:${page + 1}` });
  }
  if (navButtons.length) {
    const navRow = navButtons.map(btn => InlineKeyboard.text(btn.text, btn.data));
    keyboard.row(...navRow);
  }
  
  keyboard.row().text("Назад в главное меню", "back_to_start");
  
  return keyboard;
}