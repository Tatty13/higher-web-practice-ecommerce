import { formatDateToReadableString } from './date';

describe('formatDateToReadableString', () => {
  it('Преобразует дату в читаемую строку на русском языке', () => {
    expect(formatDateToReadableString('2024-01-05')).toBe('05 января 2024 г.');
  });

  it('Корректно обрабатывает строку даты и времени без сдвига даты из-за часового пояса', () => {
    expect(formatDateToReadableString('2024-12-31T23:59:59Z')).toBe(
      '31 декабря 2024 г.',
    );
  });
});
