import { Router } from 'express'

import {
  registerUser,
  loginUser,
  refreshToken,
  resetPassword,
  changePassword,
  forgotPassword,
  getUpcomingUserActivities,
  getTransactionHistory,
  updateKycProfile,
  userProfileDetails,
  resendVerifyUserEmail,
  verifyUserEmail,
  getUserWallets,
  getUserWalletBalances,
} from '../../controllers/userControllers'
import {
  authorizationMiddleware,
  validateRefreshTokenMiddleWare,
} from '../../middleware/authorization/authentication'
import { upload } from '../../middleware/upload'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 * tags:
 *   name: Users
 *   description: All user APIs
 * paths:
 *   /api/v1/users/register:
 *     post:
 *       summary: Register new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: Registration successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "Registration Successful."
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstName: string
 *                     lastName: string
 *                     email: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Password mismatch"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/tokenRefresh', validateRefreshTokenMiddleWare, refreshToken)

router.post('/forgotPassword', forgotPassword)

router.get(
  '/upcomingActivities',
  authorizationMiddleware,
  getUpcomingUserActivities
)

router.get('/wallets', authorizationMiddleware, getUserWallets)

/**
 * @swagger
 * /api/v1/users/resetPassword:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: verify
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token received in the email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: New user password
 *               verify:
 *                 type: string
 *                 description: Verification token received in the email
 *             required:
 *               - newPassword
 *               - verify
 *           example:
 *             newPassword: "DUBUM9&%"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Password reset successful. You can now log in with your new password."
 *       400:
 *         description: Bad request or invalid request body
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid request body."
 *               errors: [...]
 *       401:
 *         description: Invalid or expired verification token
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid or expired reset password token."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "This is our fault, our team is working to resolve this."
 */
router.post('/resetPassword', resetPassword)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs for user authentication
 * paths:
 *   /api/v1/users/changePassword:
 *     patch:
 *       summary: Change user password
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 oldPassword:
 *                   type: string
 *                   description: Current password
 *                 newPassword:
 *                   type: string
 *                   description: New password
 *               example:
 *                 oldPassword: "oldPassword123"
 *                 newPassword: "newPassword456"
 *       responses:
 *         200:
 *           description: Password updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Password updated successfully"
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Validation error"
 *                 issues:
 *                   - "newPassword must meet password requirements"
 *                   - "Wrong password"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error, please try again later"
 */
router.patch('/changePassword', authorizationMiddleware, changePassword)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: All user APIs
 * paths:
 *   /api/v1/users/transactionHistory:
 *     get:
 *       summary: Get user transaction history
 *       description: Retrieves the transaction history for the authenticated user.
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: Success. Returns the transaction history for the user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Transaction history fetched successfully"
 *                 transactionHistory:
 *                   - id: "1"
 *                     amount: 100.00
 *                     description: "Purchase at XYZ Store"
 *                     createdAt: "2023-12-01T12:00:00Z"
 *                   - id: "2"
 *                     amount: 50.00
 *                     description: "Withdrawal from ATM"
 *                     createdAt: "2023-11-30T15:30:00Z"
 *                   # ... (more transactions)
 *         401:
 *           description: Unauthorized. Token is missing or invalid.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized access"
 *                 code: JWT_INVALID_STATUS_CODE
 *         500:
 *           description: Internal Server Error. Something went wrong on the server.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong, our team has been notified."
 */

router.get(
  '/transactionHistory',
  authorizationMiddleware,
  getTransactionHistory
)

router.patch(
  '/updateProfile',
  authorizationMiddleware,
  upload.fields([
    { name: 'identification_doc', maxCount: 1 },
    { name: 'proof_of_address_doc', maxCount: 1 },
  ]),
  updateKycProfile
)

router.get('/profile', authorizationMiddleware, userProfileDetails)

router.post('/verifyEmail', verifyUserEmail)

router.get(
  '/resendVerifyUserEmail',
  authorizationMiddleware,
  resendVerifyUserEmail
)

router.get('/walletBalances', authorizationMiddleware, getUserWalletBalances)

export default router
