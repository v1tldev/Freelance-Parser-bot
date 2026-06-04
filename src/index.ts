import { bot } from "./bot";
import { getSubcategoriesKeyboard } from "./keyboards/categoryKeyboard";
import { startKeyboard } from "./keyboards/startKeyboard";
import { parseAllKworks } from "./services/parser";
import { getAnalysisResult } from "./services/analitics";
import { InputFile } from 'grammy';

bot.start({onStart: () => {
    console.log("Bot started!");
}})

bot.callbackQuery(/^analyze:(.+)$/, async (ctx) => {
  const path = ctx.match[1];
  const url = `${process.env.BASE_URL}${path}`;
  await ctx.answerCallbackQuery();
  
  const frames = ['[     ]', '[=    ]', '[==   ]', '[===  ]', '[==== ]', '[=====]'];
  let frameIndex = 0;
  const animMsg = await ctx.reply(frames[frameIndex]);
  const interval = setInterval(async () => {
    frameIndex = (frameIndex + 1) % frames.length;
    await ctx.api.editMessageText(animMsg.chat.id, animMsg.message_id, frames[frameIndex]).catch(() => {});
  }, 500);

  try {
    const items = await parseAllKworks(url, 10, 1000, 2500);
    clearInterval(interval);
    await ctx.api.deleteMessage(animMsg.chat.id, animMsg.message_id).catch(() => {});
    
    if (!items.length) {
        await ctx.reply('❌ Ничего не найдено.');
        return;
      }
      
      const { statsText, csvBuffer } = getAnalysisResult(items);
      await ctx.reply(statsText, { parse_mode: 'Markdown' });
      await ctx.replyWithDocument(new InputFile(csvBuffer, `kwork_${Date.now()}.csv`));
  } catch (err) {
    clearInterval(interval);
    await ctx.api.editMessageText(animMsg.chat.id, animMsg.message_id, '❌ Ошибка парсинга').catch(() => {});
  }
});

bot.callbackQuery(/^page:(\d+)$/, async (ctx) => {
  const page = parseInt(ctx.match[1]);
  await ctx.editMessageText("🔍 Выберите категорию из IT-разработки:", {
    reply_markup: getSubcategoriesKeyboard(page)
  });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("back_to_start", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Главное меню", {reply_markup: startKeyboard});
  await ctx.deleteMessage();
});