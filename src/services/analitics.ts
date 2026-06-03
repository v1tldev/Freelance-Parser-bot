import { ServiceItem } from './parser';

export function generateCSV(items: ServiceItem[]): Buffer {
  const header = 'name;price;link;seller\n';
  const rows = items.map(item => {
    const safeName = item.name.replace(/;/g, ',').replace(/"/g, '""');
    return `${safeName};${item.price};${item.link};${item.seller}`;
  }).join('\n');
  return Buffer.from(header + rows, 'utf-8');
}

export function formatStats(items: ServiceItem[]): string {
  if (!items.length) return '❌ Нет данных для анализа.';
  
  const prices = items.map(i => i.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = Math.round(prices.reduce((a,b) => a+b,0) / prices.length);
  
  const cheapest = [...items].sort((a,b) => a.price - b.price).slice(0,3);
  const mostExpensive = [...items].sort((a,b) => b.price - a.price).slice(0,3);
  
  let msg = `📊 *Результаты анализа*\n`;
  msg += `▪ Всего услуг: ${items.length}\n`;
  msg += `▪ Цены: от ${min}₽ до ${max}₽ (средняя ${avg}₽)\n\n`;
  
  msg += `💎 *Самые дорогие:*\n`;
  mostExpensive.forEach((k, i) => msg += `${i+1}. ${k.name.substring(0, 50)} — ${k.price}₽\n`);
  msg += `\n🪙 *Самые дешёвые:*\n`;
  cheapest.forEach((k, i) => msg += `${i+1}. ${k.name.substring(0, 50)} — ${k.price}₽\n`);

  return msg;
}

export function getAnalysisResult(items: ServiceItem[]) {
  return {
    statsText: formatStats(items),
    csvBuffer: generateCSV(items),
  };
}