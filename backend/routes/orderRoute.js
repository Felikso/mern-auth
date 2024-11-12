import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, removeOrder, verifyOrderCode } from '../controllers/orderController.js'
import { verifyUrl, verifyOrderUrl, userOrdersUrl } from '../variables.js'

const orderRoute = express.Router();

orderRoute.post('/place',authMiddleware,placeOrder)
orderRoute.post(verifyUrl,verifyOrder)
orderRoute.post(verifyOrderUrl,verifyOrderCode)
orderRoute.post(userOrdersUrl,authMiddleware,userOrders)
orderRoute.get('/list',listOrders)
orderRoute.post('/status',updateStatus)
orderRoute.post('/remove',removeOrder)

export default orderRoute