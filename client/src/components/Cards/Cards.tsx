import React from 'react';
import styles from './Cards.module.scss';
import { Card } from '@/components/Card';
import { IProductFromDB } from '@/interfaces/IProductFromDB';

interface IProps {
  cardsList: IProductFromDB[]
}

export const Cards: React.FC<IProps> = ({cardsList}: IProps) => {
  return (
    <ul className={styles.cardList}>
      {cardsList.length && cardsList.map((item) => <Card key={item._id} card={item} />)}
    </ul>
  );
}
