import utils from '@/utils';
import type {
  Product,
  ProductSort,
  ProductFilters,
  ProductRating,
  Order,
  UserProfile,
} from '@/types';

const DEFAULT_PAGE_PRODUCTS_COUNT = 12;

const sortProducts = (
  items: Product[] = [],
  sort: ProductSort = 'default',
): Product[] => {
  const copy = [...items];

  switch (sort) {
    case 'price_asc':
      return copy.sort((a, b) => a.price - b.price);

    case 'price_desc':
      return copy.sort((a, b) => b.price - a.price);

    case 'newest':
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    case 'rating':
      return copy.sort(
        (a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount,
      );

    default:
      return copy;
  }
};

const filterProducts = (
  items: Product[],
  params: ProductFilters,
): Product[] => {
  return items.filter((product) => {
    const category = product.characteristics['категория'];
    const style = product.characteristics['стиль'];
    const thickness = product.characteristics['густота'];

    if (params.category && category !== params.category) return false;
    if (params.style?.length && !params.style.includes(style)) return false;
    if (params.thickness && thickness !== params.thickness) return false;
    if (params.inStock && !product.inStock) return false;
    if (params.minPrice !== undefined && product.price < params.minPrice)
      return false;
    if (params.maxPrice !== undefined && product.price > params.maxPrice)
      return false;

    return true;
  });
};

const getAverageRating = (ratings: ProductRating[]) => {
  if (!ratings.length) return '0.0';

  const average =
    ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length;

  return average.toFixed(1);
};

const getProductRatingDescription = (count: number): string => {
  return utils.declension.getDeclensionWithCount({
    count,
    declensions: {
      one: 'оценка',
      two: 'оценки',
      many: 'оценок',
    },
  });
};

const canUserRateProduct = ({
  user,
  orders,
  ratings,
  productId,
}: {
  user: UserProfile | undefined;
  orders: Order[] | undefined;
  ratings: ProductRating[];
  productId: string | undefined;
}) => {
  if (!user || !productId) return false;

  const hasBought = orders?.some((order) =>
    order.items.some((item) => item.productId === productId),
  );

  if (!hasBought) {
    return false;
  }

  const alreadyRated = ratings?.some((rating) => rating.userId === user.id);

  return !alreadyRated;
};

export const helpersCatalog = {
  DEFAULT_PAGE_PRODUCTS_COUNT,
  sortProducts,
  filterProducts,
  getAverageRating,
  getProductRatingDescription,
  canUserRateProduct,
};
