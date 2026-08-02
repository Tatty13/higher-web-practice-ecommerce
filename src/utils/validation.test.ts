import { REGEXP } from './validation';

describe('REGEXP.phone', () => {
  it('Принимает валидные номера телефонов, начинающиеся с +7', () => {
    expect(REGEXP.phone.test('+79123456789')).toBe(true);
  });

  it('Принимает валидные номера телефонов, начинающиеся с 7', () => {
    expect(REGEXP.phone.test('79123456789')).toBe(true);
  });

  it('Принимает валидные номера телефонов, начинающиеся с 8', () => {
    expect(REGEXP.phone.test('89123456789')).toBe(true);
  });

  it('Отклоняет телефон, если вторая цифра не 9', () => {
    expect(REGEXP.phone.test('+70123456789')).toBe(false);
    expect(REGEXP.phone.test('+71123456789')).toBe(false);
    expect(REGEXP.phone.test('+72123456789')).toBe(false);
    expect(REGEXP.phone.test('+73123456789')).toBe(false);
    expect(REGEXP.phone.test('+74123456789')).toBe(false);
    expect(REGEXP.phone.test('+75123456789')).toBe(false);
    expect(REGEXP.phone.test('+76123456789')).toBe(false);
    expect(REGEXP.phone.test('+77123456789')).toBe(false);
    expect(REGEXP.phone.test('+78123456789')).toBe(false);
  });

  it('Отклоняет номер телефона, в котором меньше 11 цифр', () => {
    expect(REGEXP.phone.test('8912345678')).toBe(false);
  });

  it('Отклоняет номер телефона, в котором больше 11 цифр', () => {
    expect(REGEXP.phone.test('891234567890')).toBe(false);
  });

  it('Отклоняет номер телефона с буквами', () => {
    expect(REGEXP.phone.test('89abcdefghij')).toBe(false);
  });

  it('Отклоняет номер телефона с пробелами', () => {
    expect(REGEXP.phone.test('8 912 345 67 89')).toBe(false);
  });

  it('Отклоняет пустую строку', () => {
    expect(REGEXP.phone.test('')).toBe(false);
  });
});

describe('REGEXP.email', () => {
  it('Принимает валидный email', () => {
    expect(REGEXP.email.test('test@example.com')).toBe(true);
  });

  it('Принимает валидный email с точками и дефисом', () => {
    expect(REGEXP.email.test('user.name@mail-domain.com')).toBe(true);
  });

  it('Отклоняет email без полного домена', () => {
    expect(REGEXP.email.test('test@')).toBe(false);
    expect(REGEXP.email.test('test@example')).toBe(false);
    expect(REGEXP.email.test('test@example.')).toBe(false);
  });

  it('Отклоняет email без @', () => {
    expect(REGEXP.email.test('test.example.com')).toBe(false);
  });

  it('Отклоняет email с пробелами', () => {
    expect(REGEXP.email.test('test @example.com')).toBe(false);
  });

  it('Отклоняет email с несколькими @', () => {
    expect(REGEXP.email.test('test@example@example.com')).toBe(false);
  });

  it('Отклоняет email с недопустимыми символами', () => {
    expect(REGEXP.email.test('test()@example.com')).toBe(false);
  });
});

describe('REGEXP.password', () => {
  it('Принимает валидный password', () => {
    expect(REGEXP.password.test('Aa123456!')).toBe(true);
  });

  it('Отклоняет пароль без заглавной буквы', () => {
    expect(REGEXP.password.test('aa123456!')).toBe(false);
  });

  it('Отклоняет пароль без строчной буквы', () => {
    expect(REGEXP.password.test('AA123456!')).toBe(false);
  });

  it('Отклоняет пароль без цифры', () => {
    expect(REGEXP.password.test('Aaabcdef!')).toBe(false);
  });

  it('Отклоняет пароль без спец. символа', () => {
    expect(REGEXP.password.test('Aa123456')).toBe(false);
  });

  it('Отклоняет пароль длиной менее 8 символов', () => {
    expect(REGEXP.password.test('Aa1!abc')).toBe(false);
  });

  it('Отклоняет пароль с пробелами', () => {
    expect(REGEXP.password.test('Aa12 3456!')).toBe(false);
  });
});
