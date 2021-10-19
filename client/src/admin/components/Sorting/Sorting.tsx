import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sorting.module.scss';
import * as actions from '@/store/actions';
import { ChangeEvent } from 'react';
import { RootState } from '@/store/reducers';

interface IOption {
  value: string,
  title: string
}

interface IProps {
  options: IOption[],
  sortObject: 'product' | 'category'
}

export const Sorting: React.FC<IProps> = ({ options, sortObject }: IProps) => {
  const dispatch = useDispatch();
  const productSorting = useSelector((state: RootState) => state.productReducer.sorting);
  
  const onSortChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLSelectElement;

    sortObject === 'product' && dispatch(actions.getProducts(productSorting, target.value));
    sortObject === 'category' && dispatch(actions.getCategories(target.value));
  };

  return (
    <div className={styles.sorting}>
      <select className={styles.sortingSelect} onChange={(e) => onSortChange(e)}>
        {options && options.map((option, index) => <option key={index} value={option.value}>{option.title}</option>)}
      </select>
    </div>
  )
};
