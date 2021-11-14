import { RootState } from '@/store/reducers';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Product.module.scss';
import * as actions from '@/store/actions';
import { ICart, IProductFromDB } from '@/interfaces';
import { Button } from '@/components/Button';
import { useParams } from 'react-router';
import { AppLayout } from '@/components/AppLayout';
import { SITE_DOMAIN } from '@/constants';
import { Grid } from '@mui/material';

interface urlParams {
  productId: string
};

export const Product: React.FC = () => {
  const { productId } = useParams<urlParams>();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const user = useSelector((state: RootState) => state.userReducer.user);
  const product: IProductFromDB = useSelector((state: RootState) => state.productReducer.product);
  const [productQuantity, setProductQuantity] = useState(1);
  const cart: ICart = useSelector((state: RootState) => state.cartReducer.cart);

  useEffect(() => {
    dispatch(actions.getProduct(productId));
    userId !== null && dispatch(actions.getUser(userId));
    user && dispatch(actions.getCart(user.cart));

    if (!cart){ 
      dispatch(actions.getGuestCart());
    };
  }, []);

  const onQuantityChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setProductQuantity(+target.value);
  };

  const onAddToCart = () => {
    if (cart) {
      dispatch(actions.addProductToCart(cart._id, productId, productQuantity));
    } else {
      dispatch(actions.addProductToGuestCart(product, productQuantity));
    }
  };

  return (
    <AppLayout>
      <div className={styles.product}>
        <Grid container spacing={2} columns={{ xs: 1, md: 2 }}>
          <Grid item xs={1} md={1}>
            <img className={styles.productImage} src={`${SITE_DOMAIN}/${product?.image}`} alt={product?.title} />
          </Grid>
          <Grid item xs={1} md={1}>
            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{product?.title}</h2>
              <p className={styles.productDescr}>{product?.description}</p>
              {product?.size && <div className={styles.productSize}>Size: {product?.size}</div>}
              {product?.amount && product.amount > 0 && <div className={styles.productAmount}>Amount: {product.amount}</div>}
              <input type="number" className={styles.productInput} value={productQuantity} onChange={(e) => onQuantityChange(e)} />
              <Button btnText="Add to cart" onClick={onAddToCart} />
            </div>
          </Grid>
        </Grid>
      </div>
    </AppLayout>
  );
};
