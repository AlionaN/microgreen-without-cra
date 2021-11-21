import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductsChart.module.scss';
import { VictoryChart, VictoryBar, VictoryStack, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip, VictoryTheme } from 'victory';
import { ICategoryFromDB, IStatistics } from '@/interfaces';
import { createDateString, sortByDate } from '@/helpers';
import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { CATEGORIES_COLORS } from '@/constants';

interface IProps {
  data: IStatistics[]
};

export const ProductsChart: React.FC<IProps> = ({ data }: IProps) => {
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
    return {data: processedData?.filter((dataItem) => dataItem.category === item._id), category: item.title };
  });

  const groups = dataByCategories?.map((item, index) => {
    return <VictoryBar data={item.data} x="period" y="count" key={index} />
  });

  const LIGHT_GREY = "hsl(355, 20%, 90%)";
  const PRIMARY_COLOR = "hsl(355, 92%, 67%)";

  return (
    <div className={styles.chart}>
      {processedData
        ? <VictoryChart
            domainPadding={40}
            animate={{ duration: 500 }}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }: { datum: any }) => {
                  const categoryItem = categories?.find((item) => datum.category === item._id)
                  return categoryItem ? `${categoryItem.title}, ${datum.count} ${datum.count === 1 ? 'piece' : 'pieces'}` : 'No data';
                }}
                labelComponent={
                  <VictoryTooltip
                    constrainToVisibleArea
                    style={{
                      fill: LIGHT_GREY,
                      fontSize: 11
                    }}
                    flyoutStyle={{
                      fill: "#24232a",
                      stroke: PRIMARY_COLOR,
                      strokeWidth: 0.5
                    }}
                  />
                }
              />
            }
          >
            <VictoryLabel 
              text='Products added to cart'
              x={180}
              y={15}
              textAnchor='middle'
            />
            <VictoryStack
              style={{ data: { width: 15 } }}
              colorScale={CATEGORIES_COLORS}
            >
              {groups}
            </VictoryStack>
          </VictoryChart>
        : 'Data not loaded'
      }
    </div>
  );
};
