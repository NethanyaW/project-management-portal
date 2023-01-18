import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../middleware/auth';
import httpStatus from 'http-status';
import {OrderModel} from '../models/Order.model';
import { OrderStatusEnum } from '../samples/order_status';

const router = Router();
// router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
    const orders = await OrderModel.find();
    if(orders&&orders.length>0) res.send(orders);
    else res.status(httpStatus.BAD_REQUEST).send("Incorrect Request");
}));

router.patch('/:id', asyncHandler(async (req, res) => {
    
    const id = req.params.id;
    console.log(id);
    const order = req.body;
    await OrderModel.findByIdAndUpdate(id, order).then(() => {
        res.status(httpStatus.NO_CONTENT).send("Order is deleted!");
    })
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    console.log("DDelete");
    const id = req.params.id;
    await OrderModel.findByIdAndRemove(id).then(() => {
        res.status(httpStatus.NO_CONTENT).send("Order is deleted!");
    })
}));

router.post('/create',
    asyncHandler(async (req:any, res:any) => {
        const requestOrder = req.body;
        if(requestOrder.items.length <= 0){
            res.status(httpStatus.BAD_REQUEST).send('Cart Is Empty!');
            return;
        }

        await OrderModel.deleteOne({
            user: req.body.user.id,
            status: OrderStatusEnum.NEW
        });

        const newOrder = new OrderModel({...requestOrder,user: req.body.user.id});
        await newOrder.save();
        res.send(newOrder);
    })
);



router.get('/byUser/:user', asyncHandler(async (req, res) => {
    const user = req.params.user;
    console.log(user);
    const orders = await OrderModel.find({user});
    if(orders&&orders.length>0) res.send(orders);
    else res.status(httpStatus.BAD_REQUEST).send("Incorrect Request");
}));

router.get('/newOrderForCurrentUser/:id', asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({user: req.params.id, status: OrderStatusEnum.NEW});
    if(order) res.send(order);
    else res.status(httpStatus.BAD_REQUEST).send("Incorrect Request");
}));



export default router;