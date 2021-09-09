import { RouteConfig } from 'react-router-config';
import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import Routes from '@enums';
import Home from '@pages/Common/Home';
import AboutUs from '@pages/Internal/AboutUs';
import Contacts from '@pages/Internal/Contacts';
import Delivery from '@pages/Internal/Delivery';
import Payment from '@pages/Internal/Payment';
import Shop from '@pages/Internal/Shop';
import Error404 from '@components/Error404';

const routerConfig: Array<RouteConfig & BreadcrumbsRoute> = [
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
];

export default routerConfig;
