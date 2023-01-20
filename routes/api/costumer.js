import { Router } from "express"
import { getCostumer, getDetailCostumerById, updateDetailCostumerById, createCustomer, deleteCostumer } from "../../controller/user.js";

const router = Router()

router.post('/', async (req, res) => {
    return await createCustomer(req, res)
})
router.get('/', async (req, res) => {
    return await getCostumer(req, res)
})
router.get('/:costumerId', async (req, res) => {
    return await getDetailCostumerById(req, res)
})
router.put('/update/:costumerId', async (req, res) => {
    return await updateDetailCostumerById(req, res)
})
router.delete('/delete/:costumerId', async (req, res) => {
    return deleteCostumer(req, res)
})

export default router