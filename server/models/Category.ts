import { Schema, model } from 'mongoose';

export interface ICategory {
  title: string
}

const schema = new Schema<ICategory>({
  title: { type: String, required: true, trim: true },
});

const CategoryModel = model<ICategory>('Category', schema)

export default CategoryModel;
