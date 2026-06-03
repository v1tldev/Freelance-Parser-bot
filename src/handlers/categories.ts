import { getSubcategoriesKeyboard } from "../keyboards/categoryKeyboard";
import { Context } from "grammy";

export async function categoriesHandler(ctx: Context) {
    await ctx.reply("🔍 Выберите категорию из IT-разработки:", {
      reply_markup: getSubcategoriesKeyboard(0)
    });
  }