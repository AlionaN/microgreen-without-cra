import { AdminLayout } from '@/components/AppLayout';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Dashboard.module.scss';
import { Grid } from '@mui/material';
import { UsersChart } from '@/admin/components/UsersChart';
import { ProductsChart } from '@/admin/components/ProductsChart';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { ProductsPie } from '@/admin/components/ProductsPie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createDateWithHyphen } from '@/helpers';

enum periodSize{
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year'
};

interface Inputs {
  dateStart: string | Date,
  dateEnd: string | Date,
  periodValue: periodSize
};

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const userStatistics = useSelector((state: RootState) => state.statisticsReducer.userStatistics);
  const productStatistics = useSelector((state: RootState) => state.statisticsReducer.productStatistics);
  const { register, handleSubmit } = useForm<Inputs>();

  const [filterData, setFilterData] = useState({
    dateStart: createDateWithHyphen(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1)),
    dateEnd: createDateWithHyphen(new Date()),
    periodValue: periodSize.DAY
  });

  const onInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    if (target.name === 'dateStart' || target.name === 'dateEnd') {
      setFilterData({
        ...filterData,
        [target.name]: target.value
      });
    } else {
      setFilterData({
        ...filterData,
        [target.name]: target.value
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = () => {
    dispatch(actions.getProductStatistics(filterData.dateStart, filterData.dateEnd, undefined, filterData.periodValue));
    dispatch(actions.getUserStatistics(filterData.dateStart, filterData.dateEnd, filterData.periodValue));
  };

  useEffect(() => {
    dispatch(actions.getUserStatistics());
    dispatch(actions.getProductStatistics());
  }, []);

  return (
    <AdminLayout>
      <Grid item xs={12}><h1 className={styles.title}>Dashboard</h1></Grid>
      <Grid item xs={12} md={12}>
        <div className={styles.panel}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Grid container spacing={2} columns={{ xs: 1, md: 4 }}>
              <Grid item xs={1} md={1} className={styles.formBlock}>
                <label htmlFor='dateStart' className={styles.formLabel}>Start Date:</label>
                <input className={styles.formInput} type='date' value={String(filterData.dateStart)} {...register('dateStart', { required: false })} onChange={(e) => onInputChange(e)} />
              </Grid>
              <Grid item xs={1} md={1} className={styles.formBlock}>
                <label htmlFor='dateEnd' className={styles.formLabel}>End Date:</label>
                <input className={styles.formInput} type='date' value={String(filterData.dateEnd)} {...register('dateEnd', { required: false })} onChange={(e) => onInputChange(e)} />
              </Grid>
              <Grid item xs={1} md={1} className={styles.formBlock}>
                <label htmlFor='periodValue' className={styles.formLabel}>Period Size:</label>
                <select className={styles.formInput} value={filterData.periodValue} {...register('periodValue', { required: false })} onChange={(e) => onInputChange(e)}>
                  <option value={periodSize.DAY}>{periodSize.DAY}</option>
                  <option value={periodSize.MONTH}>{periodSize.MONTH}</option>
                  <option value={periodSize.YEAR}>{periodSize.YEAR}</option>
                </select>
              </Grid>
              <Grid item xs={1} md={1}>
                <input type='submit' value='Send' className={styles.formBtn} />
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        {productStatistics
          ? <ProductsPie data={productStatistics} />
          : 'Data not loaded'
        }
      </Grid>
      <Grid item xs={12} md={4}>
        {productStatistics
          ? <ProductsChart data={productStatistics} />
          : 'Data not loaded'
        }
      </Grid>
      <Grid item xs={12} md={4} alignSelf='center'>
        {userStatistics
          ? <UsersChart data={userStatistics} />
          : 'Data not loaded'
        }
      </Grid>
    </AdminLayout>
  );
};

