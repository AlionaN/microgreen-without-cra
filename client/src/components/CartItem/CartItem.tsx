import { ICartItem } from '@/interfaces';
import React, { FormEvent, MouseEvent } from 'react';
import styles from './CartItem.module.scss';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@/store/actions';
import { RootState } from '@/store/reducers';
import { SITE_DOMAIN } from '@/constants';
import { Grid } from '@mui/material';

interface IProps {
  item: ICartItem
};

export const CartItem: React.FC<IProps> = ({ item }: IProps) => {
  const dispatch = useDispatch();
  const { product, itemPrice, quantity } = item;
  const cart = useSelector((state: RootState) => state.cartReducer.cart);

  const onQuantityChange = (e: FormEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    if (target.value === '' || target.value === '0') {
      return;
    }
    if (cart && cart !== null) {
      dispatch(actions.updateProductInCart(cart._id, product._id, Number(target.value)));
    } else {
      dispatch(actions.updateProductInGuestCart(product._id, Number(target.value)));
      dispatch(actions.getGuestCart());
    }
  };

  const onDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (cart) {
      dispatch(actions.deleteProductFromCart(cart._id, product._id));
    } else {
      dispatch(actions.deleteProductFromGuestCart(product._id));
      dispatch(actions.getGuestCart());
    }
  };

  return (
    <li className={styles.cartListItem}>
      <Grid container spacing={2} columns={{ xs: 6 }} alignItems='center'>
        <Grid item xs={1}><img src={`${SITE_DOMAIN}/${product.image}`} alt={product.title} className={styles.cartListItemImg} /></Grid>
        <Grid item xs={2}><div className={styles.cartListItemTitle}>{product.title}</div></Grid>
        <Grid item xs={1}>
          <input
            type="number"
            className={styles.cartListItemInput}
            name="quantity"
            value={quantity}
            onChange={(e) => onQuantityChange(e)}
            min={1}
          />
        </Grid>
        <Grid item xs={1}><div className={styles.cartListItemPrice}>{itemPrice.toFixed(2)}$</div></Grid>
        <Grid item xs={1}><button className={styles.delete} onClick={(e) => onDeleteClick(e)}><MdClose /></button></Grid>
      </Grid>
    </li>
  );
};
