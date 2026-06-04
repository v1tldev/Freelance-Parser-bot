import { bot } from "./bot";
import { getSubcategoriesKeyboard } from "./keyboards/categoryKeyboard";
import { parseAllKworks } from "./services/parser";
import { getAnalysisResult } from "./services/analitics";
import { InputFile } from 'grammy';
import { devSubcategories } from "./consts/categoriesData";

bot.start({onStart: () => {
    console.log("Bot started!");
}})

bot.callbackQuery(/^analyze:(.+)$/, async (ctx) => {
  const pathByCategoryId = new Map(devSubcategories.map(c => [c.id, c.path]));
  await ctx.answerCallbackQuery();
  const id = ctx.match[1];
  const path = pathByCategoryId.get(id);
  if (!path) {
    await ctx.reply('❌ Категория не найдена.');
    return;
  }
  const fullUrl = `${process.env.BASE_URL}${path}`;
  
  const frames = [
    '[          ]',
    '[=         ]',
    '[==        ]',
    '[===       ]',
    '[====      ]',
    '[=====     ]',
    '[======    ]',
    '[=======   ]',
    '[========  ]',
    '[========= ]',
    '[==========]'
  ];

  let frameIndex = 0;
  const animMsg = await ctx.reply(frames[frameIndex]);
  const interval = setInterval(async () => {
    frameIndex = (frameIndex + 1) % frames.length;
    await ctx.api.editMessageText(animMsg.chat.id, animMsg.message_id, frames[frameIndex]).catch(() => {});
  }, 500);

  try {
    const items = await parseAllKworks(fullUrl, 10, 1000, 2500);
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
  await ctx.answerCallbackQuery();
  await ctx.api.editMessageText(ctx.chat!.id, ctx.callbackQuery.message!.message_id, "🔍 Выберите категорию из IT-разработки:", {
    reply_markup: getSubcategoriesKeyboard(page)
  });
});