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
