export type Order = {
  id: string;
  number: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  pickupPointId?: string;
  customer: OrderCustomerInfo;
  comment?: string;
  createdAt: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'card_online' | 'card_on_delivery' | 'cash';

export type DeliveryMethod = 'courier' | 'pickup_point';

export type PickupPoint = {
  id: string;
  name: string;
  address: string;
  workTime: string;
};

export type OrderCustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CreateOrderPayload = Omit<
  Order,
  'id' | 'number' | 'createdAt' | 'status'
>;
