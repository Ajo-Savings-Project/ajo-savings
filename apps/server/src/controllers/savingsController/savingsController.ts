import * as jwt from 'jsonwebtoken'
import { RequestExt } from '../../middlware/authorization/authentication'
import { Response } from 'express'
import Savings from '../../models/savings'
import { createPersonalSavingsWalletJob } from '../../backgroundJobs/walletTasks/jobs'
import { v4 } from 'uuid'
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode'
import { createSavingsSchema } from '../../utils/validators'
import { JwtPayload } from 'jsonwebtoken'
import ENV from '../../config/env'
import Wallets from '../../models/wallets'

export const createSavings = async (req: RequestExt, res: Response) => {
  try {
    // Verify user using jwt
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Unauthorized! Please provide a valid token.',
      })
    }

    let userId: string

    try {
      const decodedToken = jwt.verify(token, ENV.JWT_SECRET!)
      userId = (decodedToken as JwtPayload).id
    } catch (verifyError) {
      // Handle token verification errors
      if (verifyError instanceof jwt.TokenExpiredError) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          message: 'Token has expired! Please log in again.',
        })
      } else if (verifyError instanceof jwt.JsonWebTokenError) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          message: 'Invalid token! Please provide a valid token.',
        })
      } else {
        throw verifyError
      }
    }

    // Validate the request body
    const requestData = createSavingsSchema.safeParse(req.body)
    if (!requestData.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: requestData.error.errors,
      })
    }

    // Extract validated data
    const {
      name,
      target,
      target_amount,
      frequency,
      category,
      startDate,
      endDate,
    } = requestData.data

    // Create a new savings object
    const newSavings = await Savings.create({
      id: v4(),
      user_id: userId,
      name,
      target,
      target_amount,
      amount_saved: 0,
      frequency,
      category,
      startDate,
      endDate,
      created_at: new Date(),
    })

    // Create a wallet for the savings account
    const savingsWallet = await createPersonalSavingsWalletJob({ userId })

    // Send a successful response with details about the created savings and wallet
    return res.status(HTTP_STATUS_CODE.CREATED).json({
      message: 'Savings account created successfully',
      savings: newSavings,
      wallet: savingsWallet,
    })
  } catch (error) {
    // Log other errors
    console.log(error)

    // Send generic Internal Server Error
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong! Our team has been notified.',
    })
  }
}

export const getSavings = async (req: RequestExt, res: Response) => {
  try {
    // Check if savingsId is properly defined
    const { savingsId } = req.body

    // Check if savingsId is valid UUID
    if (!savingsId || !isValidUUID(savingsId)) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: 'Invalid savingsId provided',
      })
    }

    // Fetch savings based on
    const userSavings = await Savings.findOne({
      where: { id: savingsId },
    })

    if (!userSavings) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: 'You have no savings or goal or target! Please create one',
      })
    }

    // Fetch wallet for the associated user
    const userWallet = await Wallets.findOne({
      where: { ownerId: userSavings.user_id },
    })

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'User savings retrieved successfully',
      savings: userSavings,
      Wallets: userWallet,
    })
  } catch (error) {
    // Log other errors
    console.log(error)

    // Send generic Internal Server Error
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong! Our team has been notified.',
    })
  }
}

export const getAllSavings = async (req: RequestExt, res: Response) => {
  try {
    // Check if it is a user with a valid _userId property
    const { userId } = req.body

    // Check if userId is valid UUID
    if (!userId || !isValidUUID(userId)) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: 'Invalid userId provided.',
      })
    }

    // Find all the savings created and bearing this same userId
    const allUserSavings = await Savings.findAll({
      where: { user_id: userId },
    })

    // Check if any savings records exist
    if (!allUserSavings || allUserSavings.length === 0) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: 'You have no savings or goal or target! Please create one',
      })
    }

    // Fetch wallet for the associated user
    const userWallet = await Wallets.findAll({
      where: { ownerId: userId },
    })

    // Send successful response
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: ' All User savings retrieved successfully',
      savings: allUserSavings,
      Wallets: userWallet,
    })
  } catch (error) {
    // Log other errors
    console.log(error)

    // Send generic Internal Server Error
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong! Our team has been notified.',
    })
  }
}

// Utility function to check if string is a valid UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
  return uuidRegex.test(uuid)
}
