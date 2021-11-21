import React, { useEffect } from 'react';
import styles from './ProductsPie.module.scss';
import { VictoryBar, VictoryTheme, VictoryPie, VictoryLabel, VictoryChart } from 'victory';
import { IStatistics, ICategoryFromDB } from '@/interfaces';
import { RootState } from '@/store/reducers';
import { createDateString, sortByDate } from '@/helpers';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@/store/actions';
import { CATEGORIES_COLORS } from '@/constants';

interface IProps {
  data: IStatistics[]
};

export const ProductsPie: React.FC<IProps> = ({ data }: IProps) => {
  const dispatch = useDispatch();

  const processedData = data?.sort(sortByDate)
  .map((item) => {
    const { day, month, year } = item._id;
    const date = createDateString({ day, month, year });

    return { period: date, count: item.count, category: item._id.categoryId };
  });

  const categories: ICategoryFromDB[] = useSelector((state: RootState) => state.categoryReducer.categories);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  const dataByCategories = categories?.map((item) => {
    const filteredData = processedData
    ?.filter((dataItem) => dataItem.category === item._id)
    
    const countSum = filteredData?.map((item) => item.count)?.reduce((current, sum) => sum += current);

    return {y: countSum, x: item.title };
  });

  const countArray = dataByCategories?.map((item) => item.y);
  const generalCount = countArray.length > 0 && countArray?.reduce((current, sum) => sum += current);

  return (
    <div className={styles.chart}>
      {processedData
        ? 
          <VictoryPie 
            data={dataByCategories}
            animate={{ duration: 500 }}
            labels={({ datum }: { datum: any }) => {
              return `${datum.x}: ${generalCount && (datum.y / generalCount * 100).toFixed(2)}%`;
            }}
            labelPosition={(index) => index
              ? "centroid"
              : "startAngle"
            }
            style={{
              data: {
                width: 80
              },
              labels: {
                fontSize: 6,
                fontFamily: 'sans-serif'
              }
            }}
            width={250}
            height={250}
            colorScale={CATEGORIES_COLORS}
          />
        : 'Data not loaded'
      }
    </div>
  );
};
