import React from 'react';
import styles from './Cards.module.scss';
import { Card } from '@/components/Card';
import { ICard } from '@/interfaces/card.interface';

interface IProps {
  cardsList: ICard[]
}

export const Cards: React.FC<IProps> = ({cardsList}: IProps) => {
  return (
    <ul className={styles.cardList}>
      {cardsList.length && cardsList.map((item) => <Card key={item.id} card={item} />)}
    </ul>
  );
}
