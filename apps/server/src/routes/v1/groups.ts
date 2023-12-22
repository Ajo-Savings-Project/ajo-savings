import { Router } from 'express'
import { createGroup } from '../../controllers/groupControllers/createGroup'
import { authorizationMiddleware } from '../../middlware/authorization/authentication'
import { upload } from '../../middlware/upload'

const router = Router()
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   required:
 *      - group_name
 *      - purpose_and_goals
 *      - frequency
 *      - startDate
 *      - endDate
 *      - number_of_participants
 *      - duration
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
 *               type: object
 *               required:
 *                 - email
 *                 - password
 */
router.post(
  '/create-group',
  authorizationMiddleware,
  upload.single('groupImage'),
  createGroup
)
export default router
