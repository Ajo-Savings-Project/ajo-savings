import { Router } from 'express'
import {
  createTarget,
  getTarget,
  getAllTarget,
} from '../../controllers/savingsController'

const router = Router()

router.post('savings/create', createTarget)
router.get('savings/get', getTarget)
router.get('savings/getAll', getAllTarget)

export default router
