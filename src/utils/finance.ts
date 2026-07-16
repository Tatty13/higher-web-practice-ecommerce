export const CURRENCY_SYMBOL = '₽';

export const formatPrice = (price: number = 0): string => {
  return price.toLocaleString('ru-RU');
};

export const getFormatPriceWithCurrency = (
  price: number,
  currency: string = CURRENCY_SYMBOL,
) => {
  return `${formatPrice(price)} ${currency}`;
};
