import React from 'react';
import styles from './Cards.module.scss';
import { Card } from '@/components/Card';
import { IProductFromDB } from '@/interfaces/IProductFromDB';
import { Grid } from '@mui/material';

interface IProps {
  cardsList: IProductFromDB[]
}

export const Cards: React.FC<IProps> = ({cardsList}: IProps) => {
  return (
    <Grid container spacing={2} columns={{ xs: 1, md: 2, lg: 4 }} alignItems='strenth'>
      {cardsList.length && cardsList.map((item) => <Grid key={item._id} item xs={1} md={1} lg={1}><Card card={item} /></Grid>)}
    </Grid>
  );
}
