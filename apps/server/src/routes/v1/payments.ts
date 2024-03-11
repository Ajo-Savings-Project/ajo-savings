import { Router } from 'express'
import {
  fundGroupWallet,
  fundWallet,
} from '../../controllers/paymentsController/fundWallet'
import { authorizationMiddleware } from '../../middleware/authorization/authentication'

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: All Payments APIs
 * paths:
 *   /api/v1/payments/fundpersonalwallet:
 *     post:
 *       summary: Create group
 *       tags: [Payments]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - amount
 *               properties:
 *                 amount:
 *                   type: number
 *       responses:
 *         200:
 *           description: Transaction successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "Transaction successful"
 *                 data:
 *                     newSavingsWallet:
 *                         id: string
 *                         ownerId: string
 *                         ownerType: string
 *                         totalAmount: number
 *                         type: string
 *                         earnings: array
 *                         totalIncome: number
 *                         updatedAt: string
 *                         createdAt: string
 *                     newGlobalWallet:
 *                         id: string
 *                         ownerId: string
 *                         ownerType: string
 *                         totalAmount: number
 *                         type: string
 *                         earnings: array
 *                         totalIncome: number
 *                         updatedAt: string
 *                         createdAt: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Insufficient funds in your global wallet"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong, our team has been notified."
 */
// router.post(
//   '/fundPersonalWallet',
//   authorizationMiddleware,
//   fundPersonalSavingsWallet
// )

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: All Payments APIs
 * paths:
 *   /api/v1/payments/fundpersonalgroupwallet:
 *     post:
 *       summary: Fund Personal Group Wallet
 *       tags: [Payments]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - amount
 *               properties:
 *                 amount:
 *                   type: number
 *       responses:
 *         200:
 *           description: Transaction successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "Transaction successful"
 *                 data:
 *                   newGroupSavingsWallet:
 *                     id: string
 *                     ownerId: string
 *                     ownerType: string
 *                     totalAmount: number
 *                     type: string
 *                     earnings: array
 *                     totalIncome: number
 *                     updatedAt: string
 *                     createdAt: string
 *                   newGlobalWallet:
 *                     id: string
 *                     ownerId: string
 *                     ownerType: string
 *                     totalAmount: number
 *                     type: string
 *                     earnings: array
 *                     totalIncome: number
 *                     updatedAt: string
 *                     createdAt: string
 *                   groupSavingsTrans:
 *                     id: string
 *                     walletId: string
 *                     ownerId: string
 *                     amount: number
 *                     status: string
 *                     action: string
 *                     type: string
 *                     senderId: string
 *                     createdAt: string
 *                     updatedAt: string
 *                   groupGlobalDebit:
 *                     id: string
 *                     walletId: string
 *                     ownerId: string
 *                     amount: number
 *                     status: string
 *                     action: string
 *                     type: string
 *                     receiverId: string
 *                     createdAt: string
 *                     updatedAt: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Insufficient funds in your global wallet"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong, our team has been notified."
 */
// router.post(
//   '/fundpersonalgroupwallet',
//   authorizationMiddleware,
//   fundPersonalGroupWallet
// )
router.post('/fundWallet', authorizationMiddleware, fundWallet)
router.post('/fundGroupWallet', authorizationMiddleware, fundGroupWallet)

export default router
