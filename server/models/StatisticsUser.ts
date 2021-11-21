import { Schema, model } from 'mongoose';

export interface IStatisticsUser {
  userId: string,
  date: Date | string,
};

const schema = new Schema<IStatisticsUser>({
  userId: String,
  date: Date,
});

const StatisticsUserModel = model<IStatisticsUser>('StatisticsUser', schema);

export default StatisticsUserModel;
