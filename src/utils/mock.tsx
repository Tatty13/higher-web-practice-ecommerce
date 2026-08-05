import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type {
  CartItem,
  Order,
  Product,
  ProductRating,
  UserProfile,
} from '@/types';

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper });
};

type RenderAppOptions = {
  initialRoute?: string;
  registrationElement?: ReactNode;
  loginElement?: ReactNode;
  mainElement?: ReactNode;
};

export const renderAuthApp = ({
  initialRoute = '/',
  registrationElement,
  loginElement,
  mainElement,
}: RenderAppOptions) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
  );

  return render(
    <Routes>
      <Route
        path='/registration'
        element={registrationElement}
      />
      <Route
        path='/login'
        element={loginElement}
      />
      <Route
        path='/main'
        element={mainElement}
      />
    </Routes>,
    { wrapper: Wrapper },
  );
};

export const createMockUser = (
  overrides: Partial<UserProfile> = {},
): UserProfile => ({
  id: 'user-1',
  firstName: 'Тест',
  lastName: 'Тестов',
  email: 'test@test.com',
  language: 'ru',
  notifyByEmail: false,
  createdAt: '2026-07-22T20:24:13.519Z',
  ...overrides,
});

type ProductCharacteristics = Product['characteristics'];

export const createMockCharacteristics = (
  overrides: Partial<ProductCharacteristics> = {},
): ProductCharacteristics => ({
  категория: 'Классические',
  стиль: 'Деловой',
  густота: 'Средняя',
  подкатегория: 'Деловые',
  форма: 'Короткий прямоугольник',
  закрученность: 'Низкая',
  харизма: '5',
  ...overrides,
});

export const createMockProduct = (
  overrides: Partial<Product> = {},
): Product => ({
  id: 'product-1',
  name: 'Председатель',
  description:
    'Густые прямые усы с характерным направлением вниз. Подходят для уверенных решений и серьёзных заявлений.',
  price: 150,
  images: [
    '/mustashes/chairman/0.png',
    '/mustashes/chairman/1.png',
    '/mustashes/chairman/2.png',
    '/mustashes/chairman/3.png',
  ],
  inStock: true,
  rating: 4.5,
  ratingCount: 10,
  createdAt: '2026-03-01T09:00:00Z',
  characteristics: createMockCharacteristics(),
  ...overrides,
});

export const createMockRating = (
  overrides: Partial<ProductRating> = {},
): ProductRating => ({
  id: 'a3e2c1b0-9f8e-4d7c-8b6a-5c4d3e2f1a00',
  userId: 'user-1',
  productId: 'product-1',
  userName: 'Тестов Т.',
  rating: 5,
  createdAt: '2026-03-05T12:00:00Z',
  ...overrides,
});

export const createMockOrder = (
  productId: string,
  overrides: Partial<Order> = {},
): Order => ({
  id: 'order-1',
  number: 'ЗАКАЗ-0000000123456',
  userId: 'user-1',
  status: 'pending',
  totalPrice: 100,
  paymentMethod: 'cash',
  deliveryMethod: 'courier',
  createdAt: '2024-01-01T00:00:00.000Z',
  items: [
    {
      productId,
      name: 'Усы',
      image: 'image.jpg',
      price: 100,
      quantity: 1,
    },
  ],
  customer: {
    email: 'user@test.ru',
    firstName: 'Иван',
    lastName: 'Иванов',
    phone: '+79999999999',
  },
  ...overrides,
});

export const createMockCartItem = (
  overrides: Partial<CartItem> = {},
): CartItem => ({
  productId: 'product-1',
  price: 150,
  quantity: 1,
  product: createMockProduct(),
  ...overrides,
});
