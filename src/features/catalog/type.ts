import type { Product, ProductRating } from '@/types';
import type { CarouselProps } from '@/uiKit/Carousel';
import type { UserRatingProps } from './components/UserRating';

export type ProductCharacteristic = {
  key: string;
  value: string;
};

export type ProductProps = {
  carouselImages: CarouselProps['images'];
  product: Product;
  characteristics: ProductCharacteristic[];
  ratings: ProductRating[];
  canUserRateProduct: boolean;
  isLoadingAddToCartBtn: boolean;
  isLoadingAddRating: boolean;
  rating: number;
  handleAddToCart: () => void;
  setRating: UserRatingProps['setRating'];
};

export type MustacheCategory =
  | 'Классические'
  | 'Исторические'
  | 'Театральные'
  | 'Экстравагантные'
  | 'Современные';

export type MustacheSubCategory =
  | 'Деловые'
  | 'Повседневные'
  | 'Минимализм'
  | 'Ранний XX век'
  | 'XIX век'
  | 'Сценические'
  | 'Геометрические'
  | 'Северные'
  | 'Пустынные'
  | 'Морские';

export type MustacheStyle =
  | 'Деловой'
  | 'Винтаж'
  | 'Театральный'
  | 'Экспериментальный'
  | 'Военный';

export type Intensity = 'Низкая' | 'Средняя' | 'Высокая';

export type CatalogNavListItem = {
  label: string;
  to?: string;
};
