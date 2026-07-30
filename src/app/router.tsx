import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  MainLayout,
  AccountLayout,
  ProfileLayout,
  AuthLayout,
  CatalogLayout,
} from '@/components/layout';
import {
  MobileOnlyRoute,
  ProtectedRoute,
  PublicOnlyRoute,
} from '@/components/common';
import {
  CartPage,
  ProfilePage,
  ProfileEditPage,
  MainPage,
  OrderConfirmPage,
  OrderHistoryPage,
  OrderPage,
  ProductPage,
  RegistrationPage,
  LoginPage,
  NotFoundPage,
  CatalogPage,
  CatalogCategoryPage,
  CatalogSubCategoryPage,
  CatalogFiltersPage,
  CatalogCategoriesPage,
} from '@/pages';

import { ROUTE_PATHS } from './paths';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <CatalogLayout />,
        children: [
          { index: true, element: <MainPage /> },
          {
            element: <MobileOnlyRoute />,
            children: [
              { path: `${ROUTE_PATHS.catalog}`, element: <CatalogPage /> },
              {
                path: `${ROUTE_PATHS.catalogCategories}`,
                element: <CatalogCategoriesPage />,
              },
              {
                path: `${ROUTE_PATHS.catalogCategory}`,
                element: <CatalogCategoryPage />,
              },
              {
                path: `${ROUTE_PATHS.catalogSubCategory}`,
                element: <CatalogSubCategoryPage />,
              },
            ],
          },
        ],
      },
      { path: `${ROUTE_PATHS.product}/:id`, element: <ProductPage /> },
      {
        path: `${ROUTE_PATHS.catalogFilters}`,
        element: <MobileOnlyRoute />,
        children: [{ index: true, element: <CatalogFiltersPage /> }],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AccountLayout />,
            children: [
              {
                path: ROUTE_PATHS.profile,
                element: <ProfileLayout />,
                children: [
                  { index: true, element: <ProfilePage /> },
                  {
                    path: ROUTE_PATHS.profileEdit,
                    element: <ProfileEditPage />,
                  },
                ],
              },
              { path: ROUTE_PATHS.orderHistory, element: <OrderHistoryPage /> },
              { path: ROUTE_PATHS.cart, element: <CartPage /> },
            ],
          },
          { path: ROUTE_PATHS.order, element: <OrderPage /> },
          { path: ROUTE_PATHS.orderConfirm, element: <OrderConfirmPage /> },
        ],
      },
    ],
  },

  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTE_PATHS.login, element: <LoginPage /> },
          { path: ROUTE_PATHS.registration, element: <RegistrationPage /> },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
