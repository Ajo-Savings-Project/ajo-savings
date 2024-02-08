import { Router } from 'express'

import {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  getUpcomingUserActivities,
  getUserPersonalSavingsWallet,
  resetPassword,
  changePassword,
  getTransactionHistory,
  updateKycProfile,
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: All user APIs
 * paths:
 *   /api/v1/users/login:
 *     post:
 *       summary: Login user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: User password
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   method:
 *                     type: string
 *                   message:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       token:
 *                         type: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Invalid email or password"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post('/login', loginUser)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * paths:
 *   /api/v1/users/token-refresh:
 *     post:
 *       summary: Refresh access token
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: false
 *       responses:
 *         200:
 *           description: Access token successfully refreshed
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized"
 *         403:
 *           description: Invalid refresh token
 *           content:
 *             application/json:
 *               example:
 *                 message: "Invalid refresh token"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post('/token-refresh', validateRefreshTokenMiddleWare, refreshToken)
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: All user APIs
 * paths:
 *   /api/v1/users/forgotPassword:
 *     post:
 *       summary: Forgot password
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *       responses:
 *         200:
 *           description: password reset link has been sent to your email
 *           content:
 *             application/json:
 *               example:
 *                 message: "password reset link has been sent to your email."
 *
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   message:
 *                     type: string
 *         404:
 *           description: Account not found
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Account not found"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post('/forgotPassword', forgotPassword)

/**
 * @swagger
 
* /api/v1/users/upcomingActivities:
 *   get:
 *     summary: Get upcoming user activities
 *     description: Retrieves upcoming user activities based on user ID.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success. Returns a list of upcoming user activities.
 *         content:
 *           application/json:
 *             example:
 *               message: "retrieved user upcoming payments successfully"
 *               contributions:
 *                 - groupName: "Ajo Legends"
 *                   contributionAmount: 5000
 *                   date: "2024-01-05T16:26:39.500Z"
 *                   image: ""
 *                 - groupName: "Ajo Legends"
 *                   contributionAmount: 5000
 *                   date: "2024-01-12T16:26:39.500Z"
 *                   image: ""
 *                 # ... (more contributions)
 *       404:
 *         description: Error. User groups not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error fetching user groups"
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong, our team has been notified."
 */
router.get(
  '/upcomingActivities',
  authorizationMiddleware,
  getUpcomingUserActivities
)
/**
 * @swagger
 * components:
 *   schemas:
 *     Income:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         amount: string
 *     Wallets:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         ownerId:
 *           type: string
 *         ownerType:
 *           type: string
 *         totalAmount:
 *           type: number
 *         totalIncome:
 *           type: number
 *         earnings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Income'
 *         type:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * /api/v1/users/personal-wallets:
 *   get:
 *     summary: Get user personal svings wallet
 *     description: Retrieves user's personal svings wallet .
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success. Returns a list of upcoming user activities.
 *         content:
 *           application/json:
 *             example:
 *               message: "savings wallet fetched successfully"
 *               data:
 *                 - $ref: '#/components/schemas/Wallet'
 *                 - $ref: '#/components/schemas/Wallet'
 *                 - $ref: '#/components/schemas/Wallet'
 *
 *       404:
 *         description: Error. User wallets not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error fetching user wallets"
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong, our team has been notified."
 */
router.get(
  '/personal-wallets',
  authorizationMiddleware,
  getUserPersonalSavingsWallet
)

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

/**
 * @swagger
 * /api/v1/users/updateProfile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile of the authenticated user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               phone:
 *                 type: string
 *                 description: Phone number of the user
 *               gender:
 *                 type: string
 *                 description: Gender of the user
 *               occupation:
 *                 type: string
 *                 description: Occupation of the user
 *               date_of_birth:
 *                 type: string
 *                 description: Date of birth of the user
 *               bvn:
 *                 type: string
 *                 description: Bank Verification Number of the user
 *               address:
 *                 type: string
 *                 description: Address of the user
 *               identification_number:
 *                 type: string
 *                 description: Identification Number of the user
 *     responses:
 *       200:
 *         description: Success. Returns the updated user profile.
 *         content:
 *           application/json:
 *             example:
 *               message: "Profile updated successfully"
 *               user:
 *                 id: "1"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *       400:
 *         description: Bad Request. Validation error in the request payload.
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 *               issues: [{ path: "fieldName", message: "Error message" }]
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized access"
 *               code: JWT_INVALID_STATUS_CODE
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong, our team has been notified."
 */

router.put(
  '/updateProfile',
  authorizationMiddleware,
  upload.fields([
    { name: 'identification_doc', maxCount: 1 },
    { name: 'proof_of_address_doc', maxCount: 1 },
  ]),
  updateKycProfile
)

export default router
