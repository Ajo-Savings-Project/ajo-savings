import { Router } from 'express'
import { createGroup } from '../../controllers/groupControllers'
import { authorizationMiddleware } from '../../middleware/authorization/authentication'
import { upload } from '../../middleware/upload'

const router = Router()
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       required:
 *          - group_name
 *          - purpose_and_goals
 *          - recurringAmount
 *          - frequency
 *          - maxNumberOfParticipants
 *          - automaticRestartCycle
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - groupName
 *         - purposeAndGoals
 *         - recurringAmount
 *         - frequency
 *         - maxNumberOfParticipants
 *         - automaticRestartCycle
 *       properties:
 *         groupName:
 *           type: string
 *           description: The name of the group
 *         purposeAndGoals:
 *           type: string
 *           description: The purpose and goals for creating the group
 *         recurringAmount:
 *           type: number
 *           description: The recurring amount contributed by the members of the group
 *         frequency:
 *           type: string
 *           description: The rate of payments by the user
 *         maxNumberOfParticipants:
 *           type: number
 *           description: The number of participants in the group
 *         automaticRestartCycle:
 *           type: boolean
 *           description: Will the contribution be automatically restarted when a cycle ends?
 *       example:
 *         groupName: "Awesome Group"
 *         purposeAndGoals: "Saving for a common goal"
 *         recurringAmount: 10000
 *         frequency: "monthly"
 *         maxNumberOfParticipants: 30
 *         automaticRestartCycle: true
 */

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: All Groups APIs
 * paths:
 *   /api/v1/groups/create-group:
 *     post:
 *       summary: Create group
 *       tags: [Groups]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       responses:
 *         201:
 *           description: Group creation successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "Group created successfully."
 *                 group:
 *                   type: object
 *                   properties:
 *                     id: string
 *                     title: string
 *                     description: string
 *                     adminId: string
 *                     recurringAmount: number
 *                     groupImage: string
 *                     amountContributedWithinFrequency: number
 *                     totalAmountWithdrawn: number
 *                     availableNumberOfParticipants: number
 *                     maxNumberOfParticipants: number
 *                     frequency: string
 *                     automaticRestartCycle: boolean
 *                     updatedAt: string
 *                     createdAt: string
 *                 wallet:
 *                   type: object
 *                   properties:
 *                     id: string
 *                     ownerId: string
 *                     ownerType: string
 *                     balance: array
 *                     type: string
 *                     updatedAt: string
 *                     createdAt: string
 *                 duration:
 *                   type: string
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 status: "error"
 *                 message: "Certain fields in the request body are not provided or are of the wrong type."
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong, our team has been notified."
 */
router.post(
  '/createGroup',
  authorizationMiddleware,
  upload.single('groupImage'),
  createGroup
)
export default router
