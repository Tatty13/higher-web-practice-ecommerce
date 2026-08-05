import type { CreateOrderPayload, Order } from '@/types';

const createOrderEntity = (payload: CreateOrderPayload): Order => {
  return {
    id: crypto.randomUUID(),
    number: `ЗАКАЗ-${Date.now()}`,
    userId: payload.userId,
    status: 'pending',
    items: payload.items,
    totalPrice: payload.totalPrice,
    paymentMethod: payload.paymentMethod,
    deliveryMethod: payload.deliveryMethod,
    deliveryAddress: payload.deliveryAddress,
    pickupPointId: payload.pickupPointId,
    customer: payload.customer,
    comment: payload.comment,
    createdAt: new Date().toString(),
  };
};

export const helpersOrderApi = {
  createOrderEntity,
};
