import React, { MouseEvent } from 'react';
import styles from './Card.module.scss';
import { Button } from '@/components/Button';
import { IProductFromDB, ICartItem } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { Link } from 'react-router-dom';
import { Routes } from '@/enums';

type IProps = {
  card: IProductFromDB
};

export const Card: React.FC<IProps> = ({ card }: IProps) => {
  const dispatch = useDispatch();
  const guestCart = useSelector((state: RootState) => state.guestCartReducer.guestCart);
  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  const { image, title, description, price, _id } = card;

  const onAddToCartClick = (e: MouseEvent<HTMLButtonElement | JSX.Element | MouseEvent>) => {
    e.stopPropagation();

    if (cart) {
      dispatch(actions.addProductToCart(cart._id, _id, 1))
    } else if (guestCart) {
      dispatch(actions.addProductToGuestCart(card, 1));
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`${Routes.Shop}/${card._id}`} className={styles.cardLink}>
        <img src={image} className={styles.cardImg} alt={title} />
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoTitle}>{title}</div>
          <div className={styles.cardInfoDescription}>{description}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cardPrice}>
            {price.toFixed(2)}
            $
          </div>
          <Button btnText="Add to cart" onClick={(e) => onAddToCartClick(e)} />
        </div>
      </Link>
    </div>
  );
};
