import { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'
import { v4 } from 'uuid'
import Savings, { SavingAttributes } from '../models/savings'
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode'

export const createUserTarget = async (req: JwtPayload, res: Response) => {
  try {
    const user_Id = req.user.id

    if (user_Id) {
      const {
        name,
        target,
        targetAmount, // Updated variable name for consistency
        category,
        frequency,
        startDate,
        endDate,
      } = req.body

      // Create a new savings or target only if user_Id is truthy
      const newSavings = await Savings.create({
        id: v4(),
        user_id: user_Id,
        name,
        target,
        frequency,
        startDate: new Date(startDate).toISOString(),
        category,
        endDate: new Date(endDate).toISOString(),
        target_amount: targetAmount, // Updated variable name for consistency
        amount_saved: 0,
        created_at: new Date(),
      } as SavingAttributes)

      // Response for Success
      res.status(201).json({
        message: `Goal / Saving, ${target} created successfully`,
        data: newSavings,
      })
    } else {
      res.status(400).json({
        error: 'Invalid user ID',
      })
    }
  } catch (error) {
    console.log(error)
    // TODO: send to error logger - error
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [
        { message: `This is our fault, our team are working to resolve this.` },
      ],
    })
  }
}

// export const getAllUserTargets = async (req: JwtPayload, res: Response) => {
//   try {
//    const user_Id = req.user.id

//    const targetDetails: SavingAttributes[] = await Savings.findAll({
//     where: { user_id: user_Id },
//     order: [['createdAt', 'DESC']],
//    })

//    if (targetDetails.length > 0) {
//     res.status(200).json({
//      message: 'All goals fetched successfully',
//      data: targetDetails,
//     })
//     } else {
//      res.status(400).json({
//       message: 'You do not have any goals or savings target',
//       })
//      }
//   } catch (error) {
//     console.log(error)
//     // TODO: send to error logger - error
//     return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
//       message: [
//         { message: `This is our fault, our team are working to resolve this.` },
//       ],
//     })
//   }
// }
