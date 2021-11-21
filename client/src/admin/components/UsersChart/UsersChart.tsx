import React from 'react';
import styles from './UsersChart.module.scss';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';
import { IStatistics } from '@/interfaces';
import { createDateString, sortByDate } from '@/helpers';
import { CATEGORIES_COLORS } from '@/constants';

interface IProps {
  data: IStatistics[],
};

export const UsersChart: React.FC<IProps> = ({ data }: IProps) => {
  const processedData = data?.sort(sortByDate)
  .map((item) => {
    const { day, month, year } = item._id;
    const date = createDateString({ day, month, year });

    return { period: date, count: item.count };
  });

  return (
    <div className={styles.chart}>
      {processedData
        ? <VictoryChart
            domainPadding={40}
            animate={{ duration: 500 }}
            theme={VictoryTheme.material}
          >
            <VictoryLabel 
              text='Registered Users'
              x={180}
              y={15}
              textAnchor='middle'
            />
            <VictoryBar
              data={processedData}
              x="period"
              y="count"
              style={{ data: { width: 15, fill: CATEGORIES_COLORS[0] } }}
            />
          </VictoryChart>
        : 'Data not loaded'
      }
    </div>
  );
};
