import { methodsCartApi } from './cart';
import { methodsCatalogApi } from './catalog';
import { methodsLocationApi } from './location';
import { methodsOrderApi } from './order';
import { methodsUserApi } from './user';

export const api = {
  order: methodsOrderApi,
  cart: methodsCartApi,
  location: methodsLocationApi,
  catalog: methodsCatalogApi,
  user: methodsUserApi,
};
