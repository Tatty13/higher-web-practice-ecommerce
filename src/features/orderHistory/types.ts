export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type DeliveryMethod = 'courier' | 'pickup_point';

export type PaymentMethod = 'card_online' | 'cash' | 'card_on_delivery';

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type Address = {
  country: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode?: string;
};

export type OrderCustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Order = {
  id: string;
  number: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  pickupPointId?: string;
  deliveryAddress?: Address;
  customer: OrderCustomerInfo;
  comment?: string;
  createdAt: string;
};

export type StateOrderHistory = {
  items: Order[];
};
