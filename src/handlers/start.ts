import { Context } from "grammy";
import { startKeyboard } from "../keyboards/startKeyboard";

export async function startHandler(ctx: Context) {
    const name = ctx.from?.first_name ?? 'Путник';

    await ctx.reply([
        `Привет, ${name}!`,
        '',
        'Получи данные о freelance-заказах по категориям.',
    ].join('\n'), {reply_markup: startKeyboard});
}