export interface IStatistics {
  _id: {
    day?: number,
    month?: number,
    year: number,
    categoryId?: string, 
  },
  count: number,
};
