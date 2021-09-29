import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();
import Category from '../models/Category';

// /api/categories

router.get(
  '',
  async (req, res) => {
    try {
      const categories = await Category.find({}, {});

      if (!categories) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'There are no categories' });
      }

      res.status(StatusCodes.OK).send(categories).json({ message: 'Categories successfully found'});

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);


// /api/categories/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById({ _id: id });

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This category not found' });
      }

      res.status(StatusCodes.OK).send(category).json({ message: 'Category successfully found' });

      return category;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);

// /api/categories
router.post(
  '',
  async (req, res) => {
    try {
      const { title } = req.body;
      const category = await Category.findOne({ title });

      if (category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Category with this name has already created' });
      }

      const newCategory = new Category({
        title
      });

      const result = await newCategory.save();

      res.status(StatusCodes.OK).send(result).json({ message: 'Category successfully created' });

      return newCategory;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);

// /api/categories/:id
router.put(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await Category.findById({ _id: id });

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This category not found' });
      }

      const updatedCategory = {
        title
      };

      const result = await Category.updateOne({ _id: id }, updatedCategory);

      res.status(StatusCodes.OK).send(result).json({ message: 'Category successfully updated' });

      return updatedCategory;
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);

// /api/categories
router.delete(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById({ _id: id });

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This category not found' });
      }

      await Category.deleteOne({_id: id});

      res.status(StatusCodes.NO_CONTENT).json({ message: 'Category successfully deleted' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
      console.log(e);
    }
  }
);


export default router;
