import axios from 'axios';

export interface ServiceItem {
  name: string;
  price: number;
  link: string;
  seller: string;
}

function extractKworksFromHtml(html: string): ServiceItem[] {
  const scriptRegex = /window\.commonRenderParams\s*=\s*(\{.*?\});/s;
  const match = html.match(scriptRegex);
  if (!match) return [];
  const data = JSON.parse(match[1]);
  const items = data?.stateData?.viewData?.kworks?.posts?.data;
  if (!items || !Array.isArray(items)) return [];

  const baseUrl = process.env.BASE_URL;
  return items.map((item: any) => ({
    name: item.gtitle || 'Без названия',
    price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
    link: item.url ? `${baseUrl}${item.url}` : '',
    seller: item.userName || '',
  }));
}

function randomDelay(minMs: number = 1000, maxMs: number = 2500): Promise<void> {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
];

function getRandomUserAgent(): string {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

export async function parseAllKworks(
  fullCategoryUrl: string,
  maxPages: number = 10,
  delayMinMs: number = 1000,
  delayMaxMs: number = 2500
): Promise<ServiceItem[]> {
  let allItems: ServiceItem[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    const url = `${fullCategoryUrl}?page=${page}`;
    try {
      const response = await axios.get<string>(url, {
        headers: { 'User-Agent': getRandomUserAgent() },
        timeout: 15000,
      });
      const items = extractKworksFromHtml(response.data);
      if (items.length === 0) {
        hasMore = false;
      } else {
        allItems.push(...items);
        page++;
        if (hasMore && page <= maxPages) {
          await randomDelay(delayMinMs, delayMaxMs);
        }
      }
    } catch (err) {
      hasMore = false;
      console.log(err);
    }
  }
  return allItems;
}