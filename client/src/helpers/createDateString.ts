import { MONTHS } from '@/constants';

interface IDate {
  day?: number,
  month?: number,
  year?: number
};

export const createDateString = (dateObj: IDate) => {
  const { day, month, year } = dateObj;
  console.log(dateObj)

  return `${month && MONTHS[month - 1] || ''} ${day || ''} ${year}`;
};

export const createDateWithHyphen = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${String(date.getDate()).padStart(2, '0')}`;
};
