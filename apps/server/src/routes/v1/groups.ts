import { Router } from 'express'
import { createGroup } from '../../controllers/groupControllers/createGroup'

const router = Router()

//Endpoints go here

router.post('/create-group', createGroup)
export default router
