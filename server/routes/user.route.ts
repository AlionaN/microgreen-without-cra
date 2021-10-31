import { Router } from 'express';
const router = Router();
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';


// /api/user/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById({ _id: id });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'This user not found' });
      }

      const { _id, firstName, secondName, img = '', cart, favourites = [], role } = user;

      res.status(StatusCodes.OK).send({
        _id,
        firstName,
        secondName,
        email: user.email,
        cart,
        img,
        role
      });
    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Try again.' });
    }
  }
);

export default router;
