import React, { useEffect, useState, useCallback, MouseEvent } from 'react';
import styles from './Cart.module.scss';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { ICartItem, ICart, IGuestCart } from '@/interfaces';
import { CartItem } from '@/components/CartItem';
import { MdClose } from 'react-icons/md';
import { Loader } from '../Loader';
import OutsideClick from '@/helpers/OutsideClick';

interface IProps {
  
};

export const Cart: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const cartId = useSelector((state: RootState) => state.userReducer.user)?.cart;
  const cart: ICart = useSelector((state: RootState) => state.cartReducer.cart);
  const getCartStatus = useSelector((state: RootState) => state.cartReducer.getCartStatus);
  const updateProductInCartStatus = useSelector((state: RootState) => state.cartReducer.updateProductInCart); 
  const deleteProductFromCartStatus = useSelector((state: RootState) => state.cartReducer.deleteProductFromCartStatus);
  const guestCart = useSelector((state: RootState) => state.guestCartReducer.guestCart);
  const loadingStatus = [getCartStatus?.loading, updateProductInCartStatus?.loading, deleteProductFromCartStatus?.loading];
  const isLoading = loadingStatus.some((item) => item === true);
  const [isCartShown, setIsCartShown] = useState(false);

  useEffect(() => {
    if (cartId && cartId !== undefined) {
      dispatch(actions.getCart(cartId));
    } else {
      dispatch(actions.getGuestCart());
    }
  }, []);

  const onCartClick = (): void => {
    setIsCartShown(true);
  };

  const onCloseClick = (): void => {
    setIsCartShown(false);
  };

  const onClearCart = (e: MouseEvent): void => {
    e.stopPropagation();
    if (cartId) {
      dispatch(actions.clearCart(cartId));
    } else if (guestCart) {
      dispatch(actions.clearGuestCart());
    }
  };

  return (
    <OutsideClick callback={() => onCloseClick()}>
      <div className={styles.cartWrapper}>
        <div className={styles.cart}><FaShoppingCart onClick={onCartClick} /></div>
        <div className={styles.cartWindow} data-hidden={isCartShown}>
          <div className={styles.cartCloseWrapper}>
            <button className={styles.cartClose}><MdClose onClick={onCloseClick} /></button>
          </div>
          {isLoading 
            ? <Loader />
            : cart?.items?.length === 0 || guestCart?.items?.length === 0
              ? <div className={styles.cartMessage}>The cart is empty</div>
              : <ul className={styles.cartList}>
                  {cart !== null && cart.items?.map((item: ICartItem) => <CartItem item={item} key={item._id} />)}
                  {guestCart !== null && guestCart?.items.map((item: ICartItem) => <CartItem item={item} key={item.product._id} />)}
                </ul>
          }
          <div className={styles.total}>
            {cart !== null || guestCart !== null &&
              <>
                <div className={styles.totalPrice}>Total price: {cartId && cart ? (cart as ICart).totalPrice.toFixed(2) : guestCart?.totalPrice.toFixed(2)}$</div>
                <div className={styles.totalQuantity}>Total quantity: {cartId && cart ? (cart as ICart).totalQuantity : guestCart?.totalQuantity}</div>
                <button className={styles.cartClearBtn} onClick={(e) => onClearCart(e)} disabled={(cart as ICart)?.items.length === 0 || guestCart?.items.length === 0}>Clear cart</button>
              </>
            }
          </div>
        </div>
      </div>
    </OutsideClick>
  );
};
