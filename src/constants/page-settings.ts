import { IPageSettings } from '../interfaces';
import Routes from '../enums';

export const RootPageSettings: IPageSettings = Object.freeze({
  path: Routes.Root,
});

export const AboutUsPageSettings: IPageSettings = Object.freeze({
  path: Routes.AboutUs,
});

export const ContactsPageSettings: IPageSettings = Object.freeze({
  path: Routes.Contacts,
});

export const PaymentPageSettings: IPageSettings = Object.freeze({
  path: Routes.Payment,
});

export const DeliveryPageSettings: IPageSettings = Object.freeze({
  path: Routes.Delivery,
});

export const ShopPageSettings: IPageSettings = Object.freeze({
  path: Routes.Shop,
});
