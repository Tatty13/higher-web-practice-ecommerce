import type { DeliveryMethod, PaymentMethod } from '@/types';
import type { OrderStatus } from './types';

const orderStatusMap: Record<OrderStatus, string> = {
  delivered: 'Получен',
  paid: 'Оплачен',
  processing: 'Принят',
  pending: 'Создан',
  shipped: 'Отправлен',
  cancelled: 'Отменён',
} as const;

const paymentMethodMap: Record<PaymentMethod, string> = {
  cash: 'наличными',
  card_online: 'картой',
  card_on_delivery: 'картой',
};

const getDeliveryMethod = (
  deliveryMethod: DeliveryMethod,
  orderStatus: OrderStatus,
) => {
  if (orderStatus === 'delivered') {
    switch (deliveryMethod) {
      case 'courier':
        return 'доставлен курьером';
      case 'pickup_point':
      default:
        return 'в пункте выдачи';
    }
  }

  switch (deliveryMethod) {
    case 'courier':
      return 'доставка курьером';
    case 'pickup_point':
    default:
      return 'доставка в пункт выдачи';
  }
};

const getPaymentDescription = (
  paymentMethod: PaymentMethod,
  orderStatus: OrderStatus,
) => {
  const paymentDescription = paymentMethodMap[paymentMethod];

  if (['delivered', 'paid'].includes(orderStatus)) {
    return `Оплачено ${paymentDescription}`;
  }

  if (orderStatus === 'cancelled') {
    return '';
  }

  return `Оплата ${paymentDescription}`;
};

export const helpersOrderHistory = {
  orderStatusMap,
  getDeliveryMethod,
  getPaymentDescription,
};
