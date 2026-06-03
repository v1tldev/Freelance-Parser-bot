import { Context } from "grammy";
import { startKeyboard } from "../keyboards/startKeyboard";

export async function helpHandler(ctx: Context) {
    await ctx.reply([
    'Я твой бот для получения данных о freelance-заказах по категориям.',
    '',
    'Что я умею:',
    '• Даю возможность выбрать любую категорию из сферы IT.',
    '• Получать данные о freelance-заказах по категориям.',
    '• Анализировать полученные данные.'
].join('\n'), {reply_markup: startKeyboard});
}