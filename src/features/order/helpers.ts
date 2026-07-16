import type { CartItem, CreateOrderPayload, UserProfile } from '@/types';

import type { FormOrderValues } from './types';

const getFakeDeliveryTime = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const buildCreateOrderPayload = ({
  user,
  cartItems,
  totalPrice,
  formValues,
}: {
  user: UserProfile;
  cartItems: CartItem[];
  totalPrice: number;
  formValues: FormOrderValues;
}): CreateOrderPayload => {
  const {
    phone,
    paymentMethod,
    deliveryMethod,
    deliveryCity,
    deliveryAddress,
    pickupPointId,
    comment,
  } = formValues;

  const orderItems: CreateOrderPayload['items'] = cartItems!.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    image: item.product.images[0],
    price: item.price,
    quantity: item.quantity,
  }));

  const customer: CreateOrderPayload['customer'] = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone,
  };

  const data: CreateOrderPayload = {
    userId: user.id,
    items: orderItems,
    totalPrice,
    paymentMethod,
    deliveryMethod,
    deliveryAddress: deliveryCity
      ? `${deliveryCity}, ${deliveryAddress}`
      : undefined,
    pickupPointId: pickupPointId || undefined,
    comment,
    customer,
  };

  return data;
};

export const helpersOrder = {
  getFakeDeliveryTime,
  buildCreateOrderPayload,
};
