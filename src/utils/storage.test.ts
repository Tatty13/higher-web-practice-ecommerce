import {
  saveUserIdLocalStorage,
  getUserIdFromLocalStorage,
  removeUserIdFromLocalStorage,
} from './storage';

describe('storage utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Сохраняет userId в localStorage', () => {
    saveUserIdLocalStorage('123');
    expect(window.localStorage.getItem('userId')).toBe('123');
  });

  it('Получает userId из localStorage', () => {
    window.localStorage.setItem('userId', '456');
    expect(getUserIdFromLocalStorage()).toBe('456');
  });

  it('Возвращает null, если userId отсутствует', () => {
    expect(getUserIdFromLocalStorage()).toBeNull();
  });

  it('Удаляет userId из localStorage', () => {
    window.localStorage.setItem('userId', '789');
    removeUserIdFromLocalStorage();
    expect(window.localStorage.getItem('userId')).toBeNull();
  });
});
