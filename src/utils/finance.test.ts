import {
  CURRENCY_SYMBOL,
  formatPrice,
  getFormatPriceWithCurrency,
} from './finance';

const formatWhiteSpace = (str: string) => str.replace(/\s/g, ' ');

describe('formatPrice', () => {
  it('Форматирует число в соответствии с ru-RU locale', () => {
    expect(formatWhiteSpace(formatPrice(1234567))).toBe('1 234 567');
  });
});

describe('getFormatPriceWithCurrency', () => {
  it('Форматирует число и добавляет символ валюты по умолчанию', () => {
    expect(formatWhiteSpace(getFormatPriceWithCurrency(1500))).toBe(
      `1 500 ${CURRENCY_SYMBOL}`,
    );
  });

  it('Форматирует число и добавляет переданный символ валюты', () => {
    expect(formatWhiteSpace(getFormatPriceWithCurrency(2500, '$'))).toBe(
      '2 500 $',
    );
  });
});
