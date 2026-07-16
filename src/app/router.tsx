import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout, AccountLayout, ProfileLayout } from '@/components/layout';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/common';
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
} from '@/pages';

import { ROUTE_PATHS } from './paths';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: `${ROUTE_PATHS.product}/:id`, element: <ProductPage /> },

      {
        element: <PublicOnlyRoute />,
        children: [
          { path: ROUTE_PATHS.login, element: <LoginPage /> },
          { path: ROUTE_PATHS.registration, element: <RegistrationPage /> },
        ],
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

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
