export const VALIDATION_MESSAGES = {
  pattern: 'Недопустимое значение',
  minLength: 'Недостаточно символов',
  maxLength: 'Превышена допустимая длина',
  required: 'Обязательный параметр',
  password:
    'Введите минимум 8 символов. В пароле должны быть: одна заглавная буква, одна строчная, одна цифра и один спецсимвол.',
} as const;

export const REGEXP = {
  phone: /^((\+?7)|8)9[0-9]{9}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?~`])[A-Za-z\d!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?~`]{8,}$/,
};

export const VALIDATION_RULES = {
  required: { required: true, message: VALIDATION_MESSAGES.required },
  email: {
    pattern: REGEXP.email,
    message: VALIDATION_MESSAGES.pattern,
  },
  password: {
    pattern: REGEXP.password,
    message: VALIDATION_MESSAGES.password,
  },
} as const;
