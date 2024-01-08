import { Router } from 'express'
import {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  getUpcomingUserActivities,
} from '../../controllers/userControllers'
import {
  authorizationMiddleware,
  validateRefreshTokenMiddleWare,
} from '../../middlware/authorization/authentication'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *         profilePic:
 *           type: string
 *           description: user profile picture
 *         role:
 *           type: string
 *         otp:
 *           type: string
 *           description: email verification otp
 *         otp_expiry:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *         occupation:
 *           type: string
 *         bvn:
 *           type: string
 *         address:
 *           type: string
 *         identification_number:
 *           type: string
 *           description: identity document number
 *         identification_doc:
 *           type: string
 *           description: identity document type
 *         proof_of_address_doc:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *       example:
 *         firstName: John
 *         lastName: Carter
 *         email: johncarter@gmail.com
 *         phone: "07012345678"
 *         password: Ajo12345678@
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
 */

/**
 * @swagger
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
export default router

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
