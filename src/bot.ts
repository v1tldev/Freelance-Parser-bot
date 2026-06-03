import "dotenv/config";
import { Bot } from "grammy";
import { Context } from "grammy";
import { startHandler } from "./handlers/start";
import { Hears } from "./consts/hears";
import { helpHandler } from "./handlers/help";
import { categoriesHandler } from "./handlers/categories";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    throw new Error("Bot token is not found in .env");
}

export const bot = new Bot<Context>(BOT_TOKEN, {
    client: {
        apiRoot: process.env.WORKER_URL
    }
});

bot.command("start", startHandler);

bot.hears(Hears.HELP, helpHandler);
bot.hears(Hears.CATEGORIES, categoriesHandler);