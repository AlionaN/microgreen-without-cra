import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();
import Category from '../models/Category';

// /api/categories

router.get(
  '',
  async (req, res) => {
    try {
      const { sortField = 'title', sortMethod = 'asc' } = req.query;

      const categories = await Category.find({}, {}).sort({ [String(sortField)]: sortMethod });

      if (!categories) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'There are no categories' });
      }

      res.status(StatusCodes.OK).send(categories).json({ message: 'Categories successfully found'});

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
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

      const result = await Category.findByIdAndUpdate({ _id: id }, updatedCategory);

      res.status(StatusCodes.OK).send(result).json({ message: 'Category successfully updated' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.', });
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

      const result = await Category.findByIdAndDelete(id);

      res.status(StatusCodes.OK).send(result).json({ message: 'Category successfully deleted' });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
    }
  }
);


export default router;
