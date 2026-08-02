import {
  getDeclensionWithCount,
  getProductCountDescription,
} from './declension';

describe('getDeclensionWithCount', () => {
  const declensions = {
    one: 'день',
    two: 'дня',
    many: 'дней',
  };

  it('Возвращает форму единственного числа для чисел, оканчивающихся на 1 (исключая 11)', () => {
    expect(getDeclensionWithCount({ count: 1, declensions })).toBe('1 день');
    expect(getDeclensionWithCount({ count: 21, declensions })).toBe('21 день');
    expect(getDeclensionWithCount({ count: 101, declensions })).toBe(
      '101 день',
    );
  });

  it('Возвращает корректное окончание для чисел, оканчивающихся 2, 3 и 4 (исключая 12-14)', () => {
    expect(getDeclensionWithCount({ count: 2, declensions })).toBe('2 дня');
    expect(getDeclensionWithCount({ count: 4, declensions })).toBe('4 дня');
    expect(getDeclensionWithCount({ count: 23, declensions })).toBe('23 дня');
  });

  it('Возвращает форму множественного числа для чисел, оканчивающихся на 5-9, а также 12-14', () => {
    expect(getDeclensionWithCount({ count: 0, declensions })).toBe('0 дней');
    expect(getDeclensionWithCount({ count: 5, declensions })).toBe('5 дней');
    expect(getDeclensionWithCount({ count: 11, declensions })).toBe('11 дней');
    expect(getDeclensionWithCount({ count: 12, declensions })).toBe('12 дней');
    expect(getDeclensionWithCount({ count: 14, declensions })).toBe('14 дней');
    expect(getDeclensionWithCount({ count: 111, declensions })).toBe(
      '111 дней',
    );
  });
});

describe('getProductCountDescription', () => {
  it('Возвращает количество продуктов с правильным склонением', () => {
    expect(getProductCountDescription(0)).toBe('0 товаров');
    expect(getProductCountDescription(1)).toBe('1 товар');
    expect(getProductCountDescription(2)).toBe('2 товара');
    expect(getProductCountDescription(4)).toBe('4 товара');
    expect(getProductCountDescription(5)).toBe('5 товаров');
    expect(getProductCountDescription(11)).toBe('11 товаров');
    expect(getProductCountDescription(21)).toBe('21 товар');
    expect(getProductCountDescription(53)).toBe('53 товара');
  });
});
