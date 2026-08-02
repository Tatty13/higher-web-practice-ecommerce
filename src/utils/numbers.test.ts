import { denormalizeNumber, normalizeNumber } from './numbers';

describe('normalizeNumber', () => {
  it('Использует только цифры', () => {
    expect(normalizeNumber('+7 (999) 123-45-67')).toBe('79991234567');
    expect(normalizeNumber('+7 (999)123 тест test')).toBe('7999123');
  });

  it('Возвращает пустую строку, если в ней нет цифр', () => {
    expect(normalizeNumber('abc')).toBe('');
  });

  it('Возвращает пустую строку для пустых входных данных', () => {
    expect(normalizeNumber('')).toBe('');
  });
});

describe('denormalizeNumber', () => {
  it('Форматирует переданный номер', () => {
    expect(denormalizeNumber('79991234567')).toBe('+7 999 123-45-67');
  });

  it('Заменяет начальную цифру 8 на 7', () => {
    expect(denormalizeNumber('89991234567')).toBe('+7 999 123-45-67');
  });

  it('По умолчанию возвращает пустую строку', () => {
    expect(denormalizeNumber()).toBe('');
  });
});
