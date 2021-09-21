import React from 'react';
import styles from './Card.module.scss';
import { Button } from '@/components/Button';
import { ICard } from '@/interfaces/ICard';
import { IMG_PATH } from '@/constants';

type IProps = {
  card: ICard
}

export const Card: React.FC<IProps> = ({ card }: IProps) => {
  const { image, title, price } = card;
  return (
    <li className={styles.card}>
      <img src={`${IMG_PATH}${image}`} className={styles.cardImg} alt={title} />
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTitle}>{title}</div>
        <div className={styles.cardInfoPrice}>
          {price.toFixed(2)}
          $
        </div>
      </div>
      <Button btnText="Add to cart" />
    </li>
  );
}
