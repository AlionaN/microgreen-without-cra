import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sorting.module.scss';
import * as actions from '@/store/actions';
import { ChangeEvent } from 'react';
import { RootState } from '@/store/reducers';

interface IOption {
  value: string,
  title: string
};

interface IProps {
  options: IOption[],
  sortObject: 'product' | 'category',
  classes?: string
};

export const Sorting: React.FC<IProps> = ({ options, sortObject, classes }: IProps) => {
  const dispatch = useDispatch();
  const productFilters = useSelector((state: RootState) => state.productReducer.filters);
  const productPaginate = useSelector((state: RootState) => state.productReducer.paginate);
  
  const onSortChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLSelectElement;

    sortObject === 'product' && dispatch(actions.getProducts(productFilters, target.value, productPaginate));
    sortObject === 'category' && dispatch(actions.getCategories(target.value));
  };

  return (
    <div className={`${styles.sorting} ${classes}`}>
      <label htmlFor="sortBy" className={styles.sortingLabel}>Sort By</label>
      <select className={styles.sortingSelect} name="sortBy" onChange={(e) => onSortChange(e)}>
        {options && options.map((option, index) => <option key={index} value={option.value}>{option.title}</option>)}
      </select>
    </div>
  );
};
