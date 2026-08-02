import {
  Order,
  Product,
  ProductFilters,
  ProductRating,
  UserProfile,
} from '@/types';
import { helpersCatalog } from './helpers';

type ProductCharacteristics = Product['characteristics'];

const createCharacteristics = (
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

const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 'product-1',
  name: 'Председатель',
  description:
    'Густые прямые усы с характерным направлением вниз. Подходят для уверенных решений и серьёзных заявлений.',
  price: 5590,
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
  characteristics: createCharacteristics(),
  ...overrides,
});

const createRating = (
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

const createUser = (overrides: Partial<UserProfile> = {}): UserProfile => ({
  id: 'user-1',
  firstName: 'Тест',
  lastName: 'Тестов',
  email: 'test@test.com',
  language: 'ru',
  notifyByEmail: false,
  createdAt: '2026-07-22T20:24:13.519Z',
  ...overrides,
});

const createOrder = (productId: string): Order => ({
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
});

describe('Сортировка товаров', () => {
  const products: Product[] = [
    createProduct({
      id: '1',
      price: 300,
      createdAt: '2026-02-10T10:00:00.000Z',
      rating: 4.2,
      ratingCount: 10,
    }),
    createProduct({
      id: '2',
      price: 100,
      createdAt: '2026-01-10T10:00:00.000Z',
      rating: 4.8,
      ratingCount: 4,
    }),
    createProduct({
      id: '3',
      price: 200,
      createdAt: '2026-03-10T10:00:00.000Z',
      rating: 4.8,
      ratingCount: 20,
    }),
  ];

  it('Сортирует по возрастанию цены', () => {
    const result = helpersCatalog.sortProducts(products, 'price_asc');
    expect(result.map((item) => item.id)).toEqual(['2', '3', '1']);
  });

  it('Сортирует по убыванию цены', () => {
    const result = helpersCatalog.sortProducts(products, 'price_desc');
    expect(result.map((item) => item.id)).toEqual(['1', '3', '2']);
  });

  it('Сортирует по новинкам', () => {
    const result = helpersCatalog.sortProducts(products, 'newest');
    expect(result.map((item) => item.id)).toEqual(['3', '1', '2']);
  });

  it('Сортирует по рейтингу и количеству оценок', () => {
    const result = helpersCatalog.sortProducts(products, 'rating');
    expect(result.map((item) => item.id)).toEqual(['3', '2', '1']);
  });

  it('Возвращает начальный массив при сортировке по умолчанию', () => {
    const result = helpersCatalog.sortProducts(products, 'default');
    expect(result).toBe(products);
  });

  it('Возвращает пустой массив, когда не передан список продуктов', () => {
    const result = helpersCatalog.sortProducts(undefined, 'price_asc');
    expect(result).toEqual([]);
  });
});

describe('Фильтрация товаров', () => {
  const products: Product[] = [
    createProduct({
      id: '1',
      price: 100,
      inStock: true,
      characteristics: createCharacteristics({
        категория: 'Классические',
        стиль: 'Деловой',
        густота: 'Высокая',
        закрученность: 'Низкая',
      }),
    }),
    createProduct({
      id: '2',
      price: 200,
      inStock: false,
      characteristics: createCharacteristics({
        категория: 'Исторические',
        стиль: 'Винтаж',
        густота: 'Средняя',
        закрученность: 'Средняя',
      }),
    }),
    createProduct({
      id: '3',
      price: 300,
      inStock: true,
      characteristics: createCharacteristics({
        категория: 'Классические',
        стиль: 'Театральный',
        густота: 'Низкая',
        закрученность: 'Высокая',
      }),
    }),
  ];

  it('Фильтрует по категориям', () => {
    const filters: ProductFilters = {
      category: 'Классические',
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['1', '3']);
  });

  it('Возвращает пустой массив, если не найдены товары заданной категории', () => {
    const filters: ProductFilters = {
      category: 'Экспериментальные',
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result).toEqual([]);
  });

  it('Фильтрует по стилю', () => {
    const filters: ProductFilters = {
      style: ['Винтаж'],
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['2']);
  });

  it('Фильтрует по стилю, если выбраны несколько опций', () => {
    const filters: ProductFilters = {
      style: ['Винтаж', 'Театральный'],
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['2', '3']);
  });

  it('Фильтрует по густоте', () => {
    const filters: ProductFilters = {
      thickness: 'Высокая',
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['1']);
  });

  it('Фильтрует по закрученности', () => {
    const filters: ProductFilters = {
      curliness: 'Высокая',
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['3']);
  });

  it('Фильтрует по наличию', () => {
    const filters: ProductFilters = {
      inStock: true,
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['1', '3']);
  });

  it('Фильтрует по минимальной цене', () => {
    const filters: ProductFilters = {
      minPrice: 200,
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['2', '3']);
  });

  it('Фильтрует по максимальной цене', () => {
    const filters: ProductFilters = {
      maxPrice: 200,
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['1', '2']);
  });

  it('Применяет несколько фильтров', () => {
    const filters: ProductFilters = {
      category: 'Классические',
      style: ['Театральный'],
      inStock: true,
      minPrice: 250,
    };

    const result = helpersCatalog.filterProducts(products, filters);
    expect(result.map((item) => item.id)).toEqual(['3']);
  });
});

describe('Получение среднего рейтинга', () => {
  it('Возвращает 0.0 для пустого массива', () => {
    expect(helpersCatalog.getAverageRating([])).toBe('0.0');
  });

  it('Возвращает среднее значение с одним десятичным знаком', () => {
    const ratings: ProductRating[] = [
      createRating({ rating: 5 }),
      createRating({ userId: 'user-2', rating: 4 }),
      createRating({ userId: 'user-3', rating: 3 }),
    ];

    expect(helpersCatalog.getAverageRating(ratings)).toBe('4.0');
  });
});

describe('Проверка возможности выставить рейтинг', () => {
  it('Возвращает false, если нет данных пользователя', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: undefined,
      orders: [createOrder('product-1')],
      ratings: [],
      productId: 'product-1',
    });

    expect(result).toBe(false);
  });

  it('Возвращает false, если не передан productId', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: createUser(),
      orders: [createOrder('product-1')],
      ratings: [],
      productId: undefined,
    });

    expect(result).toBe(false);
  });

  it('Возвращает false, если пользователь не покупал товар', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: createUser(),
      orders: [createOrder('product-1')],
      ratings: [],
      productId: 'product-2',
    });

    expect(result).toBe(false);
  });

  it('Возвращает false, если пользователь уже выставлял оценку', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: createUser(),
      orders: [createOrder('product-1')],
      ratings: [createRating({ userId: 'user-1' })],
      productId: 'product-1',
    });

    expect(result).toBe(false);
  });

  it('Возвращает true, если пользователь покупал товар, но ещё не выставлял оценку', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: createUser(),
      orders: [createOrder('product-1')],
      ratings: [createRating({ userId: 'user-2' })],
      productId: 'product-1',
    });

    expect(result).toBe(true);
  });
});

describe('Парсинг фильтров из параметров поиска', () => {
  it('Извлекает все фильтры', () => {
    const params = new URLSearchParams([
      ['minPrice', '100'],
      ['maxPrice', '500'],
      ['thickness', 'Высокая'],
      ['curliness', 'Средняя'],
      ['inStock', 'true'],
      ['style', 'Деловой'],
      ['style', 'Винтаж'],
    ]);

    expect(helpersCatalog.parseFiltersFromSearchParams(params)).toEqual({
      minPrice: 100,
      maxPrice: 500,
      thickness: 'Высокая',
      curliness: 'Средняя',
      inStock: true,
      style: ['Деловой', 'Винтаж'],
    });
  });

  it('Возвращает объект без значений, для пустых параметров', () => {
    const params = new URLSearchParams();

    expect(helpersCatalog.parseFiltersFromSearchParams(params)).toEqual({
      minPrice: undefined,
      maxPrice: undefined,
      thickness: undefined,
      curliness: undefined,
      inStock: undefined,
      style: undefined,
    });
  });
});
