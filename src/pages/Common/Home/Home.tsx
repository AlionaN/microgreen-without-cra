/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import Cards from '@components/Cards';
import Hero from '@components/Hero';
import products from '../../../products';
import { ICard } from '@interfaces/card.interface';
import IMG_PATH from '@constants';

const Home: React.FC = () => {
  const randomCards = (): ICard[] => {
    const res = [];
    for (let i = 0; i < products.length; i += 3) {
      res.push(products[i]);
    }
    return res;
  };

  return (
    <>
      <Hero />
      <div className={styles.about}>
        <img src={`${IMG_PATH}about.jpg`} className={styles.aboutImg} alt="About microgreen" />
        <div className={styles.aboutInfo}>
          <div className={styles.aboutInfoTitle}>Microgreen is ...</div>
          <div className={styles.aboutInfoText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus ultricies tristique nulla. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus. Placerat in egestas erat imperdiet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Faucibus a pellentesque sit amet porttitor eget. Est ultricies integer quis auctor elit sed vulputate mi. Diam maecenas sed enim ut.
          </div>
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.productsTitle}>Products</div>
        <Cards cardsList={randomCards()} />
        <NavLink to="/shop" className={styles.toShop}>Go To Shop</NavLink>
      </div>
    </>
  );
}

export default Home;
