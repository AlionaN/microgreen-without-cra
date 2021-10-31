import { RootState } from '@/store/reducers';
import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss';
import * as actions from '@/store/actions';
import { PRODUCTS_PER_PAGE } from '@/constants';

interface IProps {
  pagesQuantity: number,
};

export const Pagination: React.FC<IProps> = ({ pagesQuantity }: IProps) => {
  const dispatch = useDispatch();
  const productSorting = useSelector((state: RootState) => state.productReducer.sorting);
  const productFilters = useSelector((state: RootState) => state.productReducer.filters);
  const [paginationConfig, setPaginationConfig] = useState({
    page: 0,
    limit: PRODUCTS_PER_PAGE
  });

  useEffect(() => {
    dispatch(actions.getProducts(productFilters, productSorting, paginationConfig))
  }, [paginationConfig]);

  const pBtns: JSX.Element[] = [];
  pagesQuantity > 1 && [...Array(pagesQuantity)]
    .map((item, index) => item = index)
    .forEach((page) => {
      pBtns.push(<li key={page}><button className={styles.paginationBtn} onClick={(e) => onPageBtnClick(e)} data-page={page}>{page + 1}</button></li>);
    });


  const onPageBtnClick = (e: MouseEvent): void => {
    const target = e.target as HTMLButtonElement;

    setPaginationConfig({
      ...paginationConfig,
      page: Number(target.getAttribute('data-page'))
    });

    dispatch(actions.getProducts(productFilters, productSorting, { page: paginationConfig.page, limit: PRODUCTS_PER_PAGE }));
  };

  return (
    <div className={styles.pagination}>
      <ul>{pagesQuantity > 0 && pBtns}</ul>
    </div>
  );
};
