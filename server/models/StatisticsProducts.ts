import { Schema, model, Types } from 'mongoose';

export interface IStatisticsProducts {
  productId: typeof Types.ObjectId,
  categoryId: typeof Types.ObjectId,
  categoryName: string,
  date: Date | string,
};

const schema = new Schema<IStatisticsProducts>({
  productId: { type: Types.ObjectId, ref: 'Product' },
  categoryId: { type: Types.ObjectId, ref: 'Category' },
  categoryName: String,
  date: Date,
});

const StatisticsProductModel = model<IStatisticsProducts>('StatisticsProducts', schema);

export default StatisticsProductModel;
