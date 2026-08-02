import { helpersProfile } from './helpers';

describe('Проверка полей на изменения', () => {
  it('Возвращает false, если поля не изменены', () => {
    const initial = {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@test.ru',
    };

    const current = {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@test.ru',
    };

    expect(helpersProfile.checkIsFieldsChanged(initial, current)).toBe(false);
  });

  it('Возвращает true, если изменено 1 поле', () => {
    const initial = {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@test.ru',
    };

    const current = {
      firstName: 'Петр',
      lastName: 'Иванов',
      email: 'ivan@test.ru',
    };

    expect(helpersProfile.checkIsFieldsChanged(initial, current)).toBe(true);
  });

  it('Возвращает true, если изменены несколько полей', () => {
    const initial = {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@test.ru',
    };

    const current = {
      firstName: 'Петр',
      lastName: 'Петров',
      email: 'petr@test.ru',
    };

    expect(helpersProfile.checkIsFieldsChanged(initial, current)).toBe(true);
  });
});
