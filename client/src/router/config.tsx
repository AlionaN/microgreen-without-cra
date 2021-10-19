import { RouteConfig } from 'react-router-config';
import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { Routes, AdminRoutes } from '@/enums';
import { Home } from '@/pages/Common/Home';
import { AboutUs } from '@/pages/Internal/AboutUs';
import { Contacts } from '@/pages/Internal/Contacts';
import { Delivery } from '@/pages/Internal/Delivery';
import { Payment } from '@/pages/Internal/Payment';
import { Shop } from '@/pages/Internal/Shop';
import { Error404 } from '@/components/Error404';
import { Error403 } from '@/components/Error403';
import { Dashboard } from '@/admin/pages/Dashboard';
import { Categories } from '@/admin/pages/Categories';
import { Products } from '@/admin/pages/Products';
import { UserIsAdmin } from './userIsAdmin';

export const routerConfig: Array<RouteConfig & BreadcrumbsRoute> = [
  {
    path: Routes.Root,
    exact: true,
    component: Home,
  },
  {
    path: Routes.Error404,
    component: Error404,
  },
  {
    path: Routes.Error403,
    component: Error403,
  },
  {
    path: Routes.AboutUs,
    component: AboutUs,
  },
  {
    path: Routes.Contacts,
    component: Contacts,
  },
  {
    path: Routes.Delivery,
    component: Delivery,
  },
  {
    path: Routes.Payment,
    component: Payment,
  },
  {
    path: Routes.Shop,
    component: Shop,
  },
  {
    path: Routes.Product,
    component: Shop,
  },
  {
    path: AdminRoutes.Admin,
    component: UserIsAdmin(Dashboard) as unknown as React.ComponentClass,
  },
  {
    path: AdminRoutes.Categories,
    component: UserIsAdmin(Categories) as unknown as React.ComponentClass,
  },
  {
    path: AdminRoutes.Products,
    component: UserIsAdmin(Products) as unknown as React.ComponentClass,
  },
];
