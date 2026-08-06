import { formatDateToReadableString } from './date';

describe('formatDateToReadableString', () => {
  it('Преобразует дату в читаемую строку на русском языке', () => {
    expect(formatDateToReadableString('2024-01-05')).toBe('05 января 2024 г.');
  });

  it('Корректно обрабатывает строку даты и времени отображая локальный часовой пояс', () => {
    const dateStr = '2024-12-31T23:59:59Z';

    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    const result = formatDateToReadableString(dateStr);
    const expected = `${day} ${monthNames[month]} ${year} г.`;

    expect(result).toBe(expected);
  });
});
