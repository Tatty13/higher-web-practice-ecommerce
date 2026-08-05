import { Product, ProductFilters, ProductRating } from '@/types';
import { helpersCatalog } from './helpers';
import utils from '@/utils';

describe('Сортировка товаров', () => {
  const products: Product[] = [
    utils.mock.createMockProduct({
      id: '1',
      price: 300,
      createdAt: '2026-02-10T10:00:00.000Z',
      rating: 4.2,
      ratingCount: 10,
    }),
    utils.mock.createMockProduct({
      id: '2',
      price: 100,
      createdAt: '2026-01-10T10:00:00.000Z',
      rating: 4.8,
      ratingCount: 4,
    }),
    utils.mock.createMockProduct({
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
    utils.mock.createMockProduct({
      id: '1',
      price: 100,
      inStock: true,
      characteristics: utils.mock.createMockCharacteristics({
        категория: 'Классические',
        стиль: 'Деловой',
        густота: 'Высокая',
        закрученность: 'Низкая',
      }),
    }),
    utils.mock.createMockProduct({
      id: '2',
      price: 200,
      inStock: false,
      characteristics: utils.mock.createMockCharacteristics({
        категория: 'Исторические',
        стиль: 'Винтаж',
        густота: 'Средняя',
        закрученность: 'Средняя',
      }),
    }),
    utils.mock.createMockProduct({
      id: '3',
      price: 300,
      inStock: true,
      characteristics: utils.mock.createMockCharacteristics({
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
      utils.mock.createMockRating({ rating: 5 }),
      utils.mock.createMockRating({ userId: 'user-2', rating: 4 }),
      utils.mock.createMockRating({ userId: 'user-3', rating: 3 }),
    ];

    expect(helpersCatalog.getAverageRating(ratings)).toBe('4.0');
  });
});

describe('Проверка возможности выставить рейтинг', () => {
  it('Возвращает false, если нет данных пользователя', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: undefined,
      orders: [utils.mock.createMockOrder('product-1')],
      ratings: [],
      productId: 'product-1',
    });

    expect(result).toBe(false);
  });

  it('Возвращает false, если не передан productId', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: utils.mock.createMockUser(),
      orders: [utils.mock.createMockOrder('product-1')],
      ratings: [],
      productId: undefined,
    });

    expect(result).toBe(false);
  });

  it('Возвращает false, если пользователь не покупал товар', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: utils.mock.createMockUser(),
      orders: [utils.mock.createMockOrder('product-1')],
      ratings: [],
      productId: 'product-2',
    });

    expect(result).toBe(false);
  });

  it('Возвращает false, если пользователь уже выставлял оценку', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: utils.mock.createMockUser(),
      orders: [utils.mock.createMockOrder('product-1')],
      ratings: [utils.mock.createMockRating({ userId: 'user-1' })],
      productId: 'product-1',
    });

    expect(result).toBe(false);
  });

  it('Возвращает true, если пользователь покупал товар, но ещё не выставлял оценку', () => {
    const result = helpersCatalog.canUserRateProduct({
      user: utils.mock.createMockUser(),
      orders: [utils.mock.createMockOrder('product-1')],
      ratings: [utils.mock.createMockRating({ userId: 'user-2' })],
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
