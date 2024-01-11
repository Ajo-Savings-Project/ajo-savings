import { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'
import { v4 } from 'uuid'
import Savings, { frequency, category } from '../../models/savings'
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode'

//Define the type of the attributes for the Savings Model
type SavingsAttributes = {
  id: string
  user_id: string
  name: string
  target: string
  target_amount: number
  amount_saved: number
  frequency: frequency
  category: category
  startDate: string
  endDate: string
  created_at: Date
}

// Create a target
export const createTarget = async (req: JwtPayload, res: Response) => {
  try {
    const user_Id = req.user.id

    if (user_Id) {
      const {
        name,
        target,
        target_amount, // Updated variable name for consistency
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
        target_amount: target_amount, // Updated variable name for consistency
        amount_saved: 0,
        created_at: new Date(),
      } as SavingsAttributes)

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

// Controller logic to get a single target by Id
export const getTarget = async (req: JwtPayload, res: Response) => {
  try {
    const user_Id = req.user.id
    const targetId = req.target.id

    if (user_Id && targetId) {
      const target = await Savings.findOne({
        where: { id: targetId, user_id: user_Id },
      })

      if (target) {
        res.status(200).json({
          message: 'Target fetched successfully',
          data: target,
        })
      } else {
        res.status(404).json({
          error: 'Invalid userId or targetId',
        })
      }
    } else {
      res.status(400).json({
        error: 'Invalid User &&|| ID!',
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

// Controller logic to get all savings target for a user
export const getAllTarget = async (req: JwtPayload, res: Response) => {
  try {
    const user_Id = req.user.id

    if (user_Id) {
      const targets = await Savings.findAll({
        where: { user_id: user_Id },
        order: [['createdAt', 'DESC']],
      })

      if (targets.length > 0) {
        res.status(200).json({
          message: 'All targets fetched successfully',
          data: targets,
        })
      } else {
        res.status(404).json({
          message: 'You do not have any savings or target',
        })
      }
    } else {
      res.status(400).json({
        message: 'Invalid User &&|| ID!',
      })
    }
  } catch (error) {
    console.log(error)
    // TODO: send to error logger - error
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [
        { message: `This is our fault, our team are working on this.` },
      ],
    })
  }
}
