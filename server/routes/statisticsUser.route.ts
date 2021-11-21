import { Router } from 'express';
const router = Router();
import StatisticsUser from '../models/StatisticsUser';
import { StatusCodes } from 'http-status-codes';

enum periodValues {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year'
}

// /api/statistics-user
router.get(
  '',
  async (req, res) => {
    try {
      const { dateStart, dateEnd, periodValue } = req.query;

      const start = new Date(String(dateStart));
      const end = new Date(String(dateEnd));
      const upperPeriodValue = String(periodValue).toLowerCase();

      if (start > end) {
        return res.status(StatusCodes.BAD_REQUEST);
      }

      const query = {
        $and: [
          {...(start && {date: { $gte: start }})},
          {...(end && {date: { $lte: end }})},
        ]
      };

      let periodQuery;

      switch(upperPeriodValue) {
        case periodValues.DAY.toLowerCase(): {
          periodQuery = { 
            day: {
              $dayOfMonth: '$date',
            },
            month: {
              $month: '$date',
            },
            year: {
              $year: '$date',
            }, 
          }
          break;
        }
        case periodValues.MONTH.toLowerCase(): {
          periodQuery = {
            month: {
              $month: '$date',
            },
            year: {
              $year: '$date',
            },
          }
          break;
        }
        case periodValues.YEAR.toLowerCase(): {
          periodQuery = {
            year: {
              $year: '$date',
            },
          }
          break;
        }
        default: {
          periodQuery = { 
            day: {
              $dayOfMonth: '$date',
            },
            month: {
              $month: '$date',
            },
            year: {
              $year: '$date',
            }, 
          }
        }
      };

      const usersByDate = await StatisticsUser.aggregate([
        { $match: query },
        { $group: {
          _id: {
            ...periodQuery
          },
          count: {
            $sum: 1
          }
        }}
      ]);

      res.status(StatusCodes.OK).send({ content: usersByDate });

    } catch(e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong. Try again. ${e}` });
    }
  }
);

export default router;
