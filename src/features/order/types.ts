import type { DeliveryMethod, PaymentMethod } from '@/types';

export type FormOrderValues = {
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  deliveryCity?: string;
  deliveryAddress?: string;
  pickupPointId?: string;
  phone: string;
  comment?: string;
};
