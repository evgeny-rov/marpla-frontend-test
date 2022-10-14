import { removeArrayDuplicates } from "../../utils";

export const getTypeNameById = (type) => {
  switch (type) {
    case 4:
      return "Каталог";
    case 5:
      return "Карточка товара";
    case 6:
      return "Поиск";
    case 7:
      return "Рекомендации";
    case 9:
      return "Активна";
    default:
      return type;
  }
};

export const getStatusNameById = (type) => {
  switch (type) {
    case 4:
      return "Готова к запуску";
    case 7:
      return "Показы завершены";
    case 8:
      return "Отказался";
    case 9:
      return "Активна";
    case 11:
      return "Приостановлено";
    default:
      return type;
  }
};

export const getCampaignsStats = (campaigns) => {
  const stats = {
    Views: 0,
    Clicks: 0,
    Ctr: 0,
    Cpc: 0,
    spent: 0,
    orders: 0,
    target: 0,
  };

  campaigns.forEach((campaign) => {
    for (const [key, value] of Object.entries(stats)) {
      stats[key] = value + (campaign[key] || 0);
    }
  });

  return stats;
};

export const filteredArticlesBySubjName = (articles) =>
  removeArrayDuplicates(articles.map(({ subjName }) => subjName));

export const getArticleSubjName = (article, articles) =>
  articles.reduce((acc, articleItem) => {
    if (articleItem.article === article) {
      return articleItem.subjName;
    }
    return acc;
  }, false);
