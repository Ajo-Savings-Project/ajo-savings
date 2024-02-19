import { Router } from 'express'
import {
  createSavings,
  getSavings,
  getAllSavings,
} from '../../controllers/savingsController/savingsController'
import { authorizationMiddleware } from '../../middlware/authorization/authentication'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSavingsRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         target:
 *           type: string
 *         target_amount:
 *           type: number
 *         frequency:
 *           type: string
 *         category:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *     Savings:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         name:
 *           type: string
 *         target:
 *           type: string
 *         frequency:
 *           type: string
 *         category:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         target_amount:
 *           type: number
 *         amount_saved:
 *           type: number
 *         endDate:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *     Wallets:
 *       type: object
 *       properties:
 *         // Define properties of Wallets schema

/**
 * @swagger
 * tags:
 *   name: Savings
 *   description: All savings APIs
 * paths:
 *   /api/v1/savings/create:
 *     post:
 *       summary: Create new savings account
 *       tags: [Savings]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateSavingsRequest'
 *       responses:
 *         201:
 *           description: Savings account created successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Savings account created successfully"
 *                 savings:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     target:
 *                       type: string
 *                     target_amount:
 *                       type: number
 *                     amount_saved:
 *                       type: number
 *                     frequency:
 *                       type: string
 *                     category:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                 wallet:
 *                   $ref: '#/components/schemas/Wallet'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Validation error"
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.post('/', authorizationMiddleware, createSavings)

/**
 * @swagger
 * paths:
 *   /api/v1/savings/get:
 *     get:
 *       summary: Get user savings by savingsId
 *       tags: [Savings]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: query
 *           name: savingsId
 *           description: ID of the savings
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User savings retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "User savings retrieved successfully"
 *                 savings:
 *                   $ref: '#/components/schemas/Savings'
 *                 wallet:
 *                   $ref: '#/components/schemas/Wallets'
 *         400:
 *           description: Invalid savingsId provided
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Invalid savingsId provided"
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized"
 *         404:
 *           description: User has no savings
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "You have no savings or goal or target! Please create one"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.get('/:id', authorizationMiddleware, getSavings)

/**
 * @swagger
 * paths:
 *   /api/v1/savings/getAll:
 *     get:
 *       summary: Get all user savings by userId
 *       tags: [Savings]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: query
 *           name: userId
 *           description: ID of the user
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: All User savings retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "All User savings retrieved successfully"
 *                 savings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Savings'
 *                 wallets:
 *                   $ref: '#/components/schemas/Wallets'
 *         400:
 *           description: Invalid userId provided
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Invalid userId provided"
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized"
 *         404:
 *           description: User has no savings
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "You have no savings or goal or target! Please create one"
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
router.get('/', authorizationMiddleware, getAllSavings)

export default router
