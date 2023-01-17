import mongoose, { model, Types } from 'mongoose';
import { OrderStatusEnum } from '../samples/order_status';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

export interface OrderItem {
    food: Object,
    price: Number,
    quantity: Number
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        food:{type: Object, required: true},
        price:{ type: Number, required:true},
        quantity: {type: Number, required: true}
    }
);

export interface Order{
    id:string;
    items: OrderItem[];
    totalPrice:number;
    name: string;
    address: string;
    paymentId: string;
    status: OrderStatusEnum;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date
  }

  const orderSchema = new Schema<Order>({
      name: {type: String, required: true},
      address: {type: String, required: true},
      paymentId: {type: String},
      totalPrice: {type: Number, required: true},
      items: {type: [OrderItemSchema], required: true},
      status: {type: String, default: OrderStatusEnum.NEW},
      user: {type: Schema.Types.ObjectId, required: true}
  },{
      timestamps: true,
      toJSON:{
          virtuals: true
      },
      toObject:{
          virtuals: true
      }
  });

  export const OrderModel = model('order', orderSchema);