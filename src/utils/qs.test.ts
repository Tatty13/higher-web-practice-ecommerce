import { createQS } from './qs';

describe('createQS', () => {
  it('Возвращает пустую строку для пустого объекта', () => {
    expect(createQS({})).toBe('');
  });

  it('Создает строку запроса из простых параметров', () => {
    expect(
      createQS({
        page: 2,
        search: 'phone',
      }),
    ).toBe('?page=2&search=phone');
  });

  it('Игнорирует falsy значения', () => {
    expect(
      createQS({
        page: 0,
        search: '',
        active: false,
        value: null,
        another: undefined,
      }),
    ).toBe('');
  });

  it('Добавляет truthy значения', () => {
    expect(
      createQS({
        page: 1,
        active: true,
      }),
    ).toBe('?page=1&active=true');
  });

  it('Сериализует значения массива в виде повторяющихся ключей', () => {
    expect(
      createQS({
        category: ['books', 'games'],
      }),
    ).toBe('?category=books&category=games');
  });

  it('Возвращает пустую строку для пустых массивов', () => {
    expect(
      createQS({
        category: [],
      }),
    ).toBe('');
  });
});
