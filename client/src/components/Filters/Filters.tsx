import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { ICategoryFromDB, IProductFilters } from '@/interfaces';
import { Grid } from '@mui/material';

interface IProps {
  classes?: string
};

export const Filters: React.FC<IProps> = ({ classes }: IProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IProductFilters>();
  const categories = useSelector((state: RootState) => state.categoryReducer.categories);
  const filters = useSelector((state: RootState) => state.productReducer.filters);
  const productSorting = useSelector((state: RootState) => state.productReducer.sorting);
  const productPaginate = useSelector((state: RootState) => state.productReducer.paginate);
  const [filtersData, setFiltersData] = useState<IProductFilters>({
    category: filters?.category || '',
    minPrice: filters?.minPrice || 0,
    maxPrice: filters?.maxPrice || 0,
  });

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    setFiltersData({
      ...filtersData,
      [target.name]: target.value
    });
  }

  const onFiltersSubmit = (data: IProductFilters): void => {
    dispatch(actions.getProducts(data, productSorting, productPaginate));
  };

  return (
    <div className={`${styles.filters} ${classes}`}>
      <form onSubmit={handleSubmit(onFiltersSubmit)}>
        <Grid container spacing={1} columns={{ xs: 1, md: 8 }} alignItems='flex-end'>
          <Grid item xs={1} md={2} className={styles.filtersBlock}>
            <label htmlFor="category" className={styles.filtersLabel}>Category</label>
            <select 
              {...register('category', { required: false })}
              className={styles.filtersSelect}
              defaultValue={filtersData.category}
              onChange={(e) => onInputChange(e)}
            >
              {categories && categories.map((category: ICategoryFromDB) => <option value={category._id} key={category._id}>{category.title}</option>)}
            </select>
          </Grid>
          <Grid item xs={1} md={2} className={styles.filtersBlock}>
            <label htmlFor="minPrice" className={styles.filtersLabel}>Minimal price</label>
            <input
              {...register('minPrice')}
              type="number"
              className={styles.filtersInput}
              defaultValue={filtersData.minPrice}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>
          <Grid item xs={1} md={2} className={styles.filtersBlock}>
            <label htmlFor="maxPrice" className={styles.filtersLabel}>Maximum price</label>
            <input
              {...register('maxPrice')}
              type="number"
              className={styles.filtersInput}
              defaultValue={filtersData.maxPrice}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>
          <Grid item xs={1} md={2}><input type="submit" value="Show" className={styles.filtersBtn} /></Grid>
        </Grid>
      </form>
    </div>
  );
};
