import { IStatistics } from '@/interfaces';

export const sortByDate = (a: IStatistics, b: IStatistics) => {
  const aDate = new Date(a._id.year, Number(a._id.month), Number(a._id.day));
  const bDate = new Date(b._id.year, Number(b._id.month), Number(b._id.day));
  return Number(aDate) - Number(bDate);
};
