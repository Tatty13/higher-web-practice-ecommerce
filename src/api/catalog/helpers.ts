import type { Product, ProductRating } from '@/types';

export type AddRatingPayload = Omit<ProductRating, 'id' | 'createdAt'>;
export type ProductRatingData = Pick<Product, 'rating' | 'ratingCount'>;

const getAverageRating = (ratings: ProductRating[]): number => {
  if (!ratings.length) {
    return 0;
  }

  const average =
    ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length;

  return average;
};

const getProductRatingData = (ratings: ProductRating[]): ProductRatingData => ({
  rating: getAverageRating(ratings),
  ratingCount: ratings.length,
});

const createRatingEntity = (payload: AddRatingPayload): ProductRating => ({
  ...payload,
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
});

export const helpersCatalogApi = {
  getProductRatingData,
  createRatingEntity,
};
