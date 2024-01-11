import { Router } from 'express'
import { oAuthUrl, getUserTokens } from '../../controllers/userControllers'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *
 *     GoogleOAuthRequest:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *
 *     GoogleOAuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 * tags:
 *   - name: GoogleOAuth
 *     description: Google OAuth Operations
 *
 * paths:
 *   /api/v1/oauth/request:
 *     post:
 *       summary: Generate Google OAuth Authorization URL
 *       tags: [GoogleOAuth]
 *       description: Use this endpoint to initiate the Google OAuth process and get the Authorization URL.
 *       responses:
 *         '200':
 *           description: Successful response with Authorization URL
 *           content:
 *             application/json:
 *               example:
 *                 message: "Success"
 *                 user:
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                   email: "john.doe@example.com"
 *                 url: "https://accounts.google.com/o/oauth2/auth?..."
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post('/request', oAuthUrl)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *
 *     GoogleOAuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 * tags:
 *   - name: GoogleOAuth
 *     description: Google OAuth Operations
 *
 * paths:
 *   /api/v1/oauth/oauth:
 *     get:
 *       summary: Sign in to Google
 *       tags: [GoogleOAuth]
 *       description: |
 *         Use this endpoint to get tokens that's used to sign in with Google
 *       responses:
 *         '200':
 *           description: Successful Google OAuth response
 *           content:
 *             application/json:
 *               example:
 *                 message: "Success"
 *                 user:
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                   email: "john.doe@example.com"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Error with signing in with Google"
 */
router.get('/oauth', getUserTokens)

export default router
