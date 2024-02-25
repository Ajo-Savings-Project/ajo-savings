import { Router } from 'express'
import { createGroup, getGroups } from '../../controllers/groupControllers'
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
 *          - frequency
 *          - startDate
 *          - endDate
 *          - number_of_participants
 *          - duration
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - group_name
 *         - purpose_and_goals
 *         - frequency
 *         - startDate
 *         - endDate
 *         - number_of_participants
 *         - duration
 *       properties:
 *         group_name:
 *           type: string
 *           description: The name of the group
 *         frequency:
 *           type: string
 *           description: The rate of payments by the user
 *         startDate:
 *           type: string
 *           format: date
 *           description: The starting date of payments by the user
 *         endDate:
 *           type: string
 *           format: date
 *           description: The ending date of payments by the user
 *         number_of_participants:
 *           type: number
 *           description: The number of participants in the group
 *         duration:
 *           type: string
 *           description: How long the group should be valid
 *       example:
 *         groupName: "Awesome Group"
 *         purposeAndGoals: "Saving for a common goal"
 *         frequency: "Weekly"
 *         startDate: "2023-01-01T00:00:00Z"
 *         endDate: "2023-12-31T23:59:59Z"
 *         numberOfParticipants: 10
 *         duration: "3 months"
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
 *                     contribution_amount: string
 *                     groupImage: string
 *                     amountContributed: string
 *                     groupTransactions: array
 *                     amountWithdrawn: number
 *                     members: array
 *                     slots: array
 *                     availableSlots: array
 *                     numberOfParticipants: number
 *                     frequency: string
 *                     duration: string
 *                     startDate: string
 *                     endDate: string
 *                     updatedAt: string
 *                     createdAt: string
 *                 wallet:
 *                   type: object
 *                   properties:
 *                     id: string
 *                     ownerId: string
 *                     ownerType: string
 *                     totalAmount: number
 *                     type: string
 *                     earnings: array
 *                     totalIncome: number
 *                     updatedAt: string
 *                     createdAt: string
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

router.get('/getGroups', authorizationMiddleware, getGroups)
export default router
