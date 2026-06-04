export interface Subcategory {
  id: string;
  name: string;
  path: string;
}
  
  export const devSubcategories: Subcategory[] = [
    { id: "parsery", name: "Парсеры", path: "/categories/script-programming/parsery" },
    { id: "chat-boty", name: "Чат-боты", path: "/categories/script-programming/chat-boty" },
    { id: "skripty", name: "Скрипты", path: "/categories/script-programming/skripty" },
    { id: "telegram-mini-apps", name: "Telegram Mini Apps", path: "/categories/script-programming/telegram-mini-apps" },
    { id: "ii-agenty", name: "ИИ-агенты", path: "/categories/script-programming/ii-agenty" },
    { id: "ii-boty", name: "ИИ-боты", path: "/categories/script-programming/ii-boty" },
    { id: "mashinnoe-obuchenie", name: "Машинное обучение", path: "/categories/script-programming/mashinnoe-obuchenie" },
    { id: "iot", name: "Интернет вещей (IoT)", path: "/categories/script-programming/internet-veshchey-iot" },
    { id: "desktop", name: "Десктоп программирование", path: "/categories/software" },
    { id: "1s", name: "1С", path: "/categories/software/1s" },
    { id: "office-macros", name: "Макросы для Office", path: "/categories/software/office" },
    { id: "gotovye-programmy", name: "Готовые программы", path: "/categories/software/drugie-gotovie" },
    { id: "programmy-na-zakaz", name: "Программы на заказ", path: "/categories/software/drugie-na-zakaz" },
    { id: "ios", name: "iOS", path: "/categories/mobile-apps/ios" },
    { id: "android", name: "Android", path: "/categories/mobile-apps/android" },
    { id: "game-dev", name: "Разработка игр", path: "/categories/game-dev/razrabotka-igr" },
    { id: "game-server", name: "Игровой сервер", path: "/categories/game-dev/igrovoy-server" },
    { id: "gotovye-igry", name: "Готовые игры", path: "/categories/game-dev/gotovie-igry" },
    { id: "server-admin", name: "Администрирование сервера", path: "/categories/server-administration/administrirovanie-servera" },
    { id: "domains", name: "Домены", path: "/categories/server-administration/domeny" },
    { id: "hosting", name: "Хостинг", path: "/categories/server-administration/khosting" },
    { id: "verstka", name: "Верстка по макету", path: "/categories/frontend/verstka-po-dizayn-maketu" },
    { id: "verstka-dorabotka", name: "Доработка и адаптация верстки", path: "/categories/frontend/dorabotka-verstki" },
    { id: "site-dorabotka", name: "Доработка сайта", path: "/categories/website-repair/dorabotka-sayta" },
    { id: "site-nastroyka", name: "Настройка сайта", path: "/categories/website-repair/nastroyka-sayta" },
    { id: "site-zashchita", name: "Защита и лечение сайта", path: "/categories/website-repair/zashchita-i-lechenie-sayta" },
    { id: "site-uskorenie", name: "Ускорение сайта", path: "/categories/website-repair/uskorenie-sayta" },
    { id: "plugins", name: "Плагины и темы", path: "/categories/website-repair/plaginy-moduli-i-temy" },
    { id: "bug-fix", name: "Исправление ошибок", path: "/categories/website-repair/ispravlenie-oshibok" },
    { id: "new-site", name: "Новый сайт", path: "/categories/website-development/noviy-sayt" },
    { id: "copy-site", name: "Копия сайта", path: "/categories/website-development/kopiya-sushchestvuyushchego" },
    { id: "usability-audit", name: "Юзабилити-аудит", path: "/categories/usability-testing/yuzabiliti-audit" },
    { id: "testing", name: "Тестирование на ошибки", path: "/categories/usability-testing/testirovanie-na-oshibki" },
    { id: "it-help", name: "Компьютерная и IT помощь", path: "/categories/usability-testing/kompyuternaya-i-it-pomoshch" },
  ];