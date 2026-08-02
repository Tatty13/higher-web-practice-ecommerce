import { helpersOrderHistory } from './helpers';

describe('Получение способа доставки', () => {
  it('Возвращает корректный текст, если заказ доставлен курьером', () => {
    expect(helpersOrderHistory.getDeliveryMethod('courier', 'delivered')).toBe(
      'доставлен курьером',
    );
  });

  it('Возвращает корректный текст, если заказ доставлен в пункт выдачи', () => {
    expect(
      helpersOrderHistory.getDeliveryMethod('pickup_point', 'delivered'),
    ).toBe('в пункте выдачи');
  });

  it('Возвращает корректный текст, если заказ с доставкой курьером', () => {
    expect(helpersOrderHistory.getDeliveryMethod('courier', 'processing')).toBe(
      'доставка курьером',
    );
    expect(helpersOrderHistory.getDeliveryMethod('courier', 'paid')).toBe(
      'доставка курьером',
    );
    expect(helpersOrderHistory.getDeliveryMethod('courier', 'pending')).toBe(
      'доставка курьером',
    );
    expect(helpersOrderHistory.getDeliveryMethod('courier', 'shipped')).toBe(
      'доставка курьером',
    );
    expect(helpersOrderHistory.getDeliveryMethod('courier', 'cancelled')).toBe(
      'доставка курьером',
    );
  });

  it('Возвращает корректный текст, если заказ с доставкой в пункт выдачи', () => {
    expect(
      helpersOrderHistory.getDeliveryMethod('pickup_point', 'processing'),
    ).toBe('доставка в пункт выдачи');
    expect(helpersOrderHistory.getDeliveryMethod('pickup_point', 'paid')).toBe(
      'доставка в пункт выдачи',
    );
    expect(
      helpersOrderHistory.getDeliveryMethod('pickup_point', 'pending'),
    ).toBe('доставка в пункт выдачи');
    expect(
      helpersOrderHistory.getDeliveryMethod('pickup_point', 'shipped'),
    ).toBe('доставка в пункт выдачи');
    expect(
      helpersOrderHistory.getDeliveryMethod('pickup_point', 'cancelled'),
    ).toBe('доставка в пункт выдачи');
  });
});

describe('Получение описания платежа', () => {
  it('Возвращает корректный текст для оплаченного наличными и полученного заказа', () => {
    expect(helpersOrderHistory.getPaymentDescription('cash', 'delivered')).toBe(
      'Оплачено наличными',
    );
  });

  it('Возвращает корректный текст для оплаченного картой заказа', () => {
    expect(
      helpersOrderHistory.getPaymentDescription('card_online', 'paid'),
    ).toBe('Оплачено картой');
  });

  it('Возвращает пустую строку для отменённого заказа', () => {
    expect(
      helpersOrderHistory.getPaymentDescription('card_online', 'cancelled'),
    ).toBe('');
    expect(helpersOrderHistory.getPaymentDescription('cash', 'cancelled')).toBe(
      '',
    );
  });

  it('Возвращает корректный текст для не оплаченного заказа', () => {
    expect(
      helpersOrderHistory.getPaymentDescription('card_on_delivery', 'pending'),
    ).toBe('Оплата картой');
    expect(
      helpersOrderHistory.getPaymentDescription('card_online', 'pending'),
    ).toBe('Оплата картой');
    expect(helpersOrderHistory.getPaymentDescription('cash', 'pending')).toBe(
      'Оплата наличными',
    );
  });
});
