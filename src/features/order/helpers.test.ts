import utils from '@/utils';

import { helpersOrder } from './helpers';
import type { FormOrderValues } from './types';

const createFormValues = (
  overrides: Partial<FormOrderValues> = {},
): FormOrderValues => ({
  phone: '+79999999999',
  paymentMethod: 'card_online',
  deliveryMethod: 'courier',
  deliveryCity: 'Москва',
  deliveryAddress: 'ул. Летняя, д. 1',
  pickupPointId: '',
  comment: 'Какой-то комментарий',
  ...overrides,
});

describe('Фейковое время доставки', () => {
  it('Возвращает отформатированную строку даты доставки', () => {
    const result = helpersOrder.getFakeDeliveryTime();

    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Формирование payload для создание заказа', () => {
  it('Создает payload для доставки курьером', () => {
    const result = helpersOrder.buildCreateOrderPayload({
      user: utils.mock.createMockUser(),
      cartItems: [utils.mock.createMockCartItem()],
      totalPrice: 300,
      formValues: createFormValues(),
    });

    expect(result).toEqual({
      userId: 'user-1',
      items: [
        {
          productId: 'product-1',
          name: 'Усы 1',
          image: 'image-1.jpg',
          price: 150,
          quantity: 2,
        },
      ],
      totalPrice: 300,
      paymentMethod: 'card_online',
      deliveryMethod: 'courier',
      deliveryAddress: 'Москва, ул. Летняя, д. 1',
      pickupPointId: undefined,
      comment: 'Какой-то комментарий',
      customer: {
        email: 'test@test.com',
        firstName: 'Тест',
        lastName: 'Тестов',
        phone: '+79999999999',
      },
    });
  });

  it('Создает payload для доставки в пункт выдачи', () => {
    const result = helpersOrder.buildCreateOrderPayload({
      user: utils.mock.createMockUser({
        id: 'user-2',
        email: 'pickup@test.ru',
        firstName: 'Петр',
        lastName: 'Петров',
      }),
      cartItems: [
        utils.mock.createMockCartItem({
          productId: 'product-2',
          quantity: 1,
          price: 500,
          product: {
            id: 'product-2',
            name: 'Усы 2',
            description: 'Описание',
            price: 500,
            createdAt: '2026-06-01T00:00:00.000Z',
            rating: 4.8,
            ratingCount: 12,
            inStock: true,
            images: ['image-2.jpg'],
            characteristics: {
              категория: 'Исторические',
              стиль: 'Винтаж',
              густота: 'Высокая',
              закрученность: 'Средняя',
            },
          },
        }),
      ],
      totalPrice: 500,
      formValues: createFormValues({
        paymentMethod: 'cash',
        deliveryMethod: 'pickup_point',
        deliveryCity: '',
        deliveryAddress: '',
        pickupPointId: '123',
        comment: '',
      }),
    });

    expect(result).toEqual({
      userId: 'user-2',
      items: [
        {
          productId: 'product-2',
          name: 'Усы 2',
          image: 'image-2.jpg',
          price: 500,
          quantity: 1,
        },
      ],
      totalPrice: 500,
      paymentMethod: 'cash',
      deliveryMethod: 'pickup_point',
      deliveryAddress: undefined,
      pickupPointId: '123',
      comment: '',
      customer: {
        email: 'pickup@test.ru',
        firstName: 'Петр',
        lastName: 'Петров',
        phone: '+79999999999',
      },
    });
  });
});
