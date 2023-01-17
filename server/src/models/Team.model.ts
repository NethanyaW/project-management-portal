import mongoose, { model, Types } from 'mongoose';
import { OrderStatusEnum } from '../samples/order_status';
import { ProjectStatus } from '../samples/project_status';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;


export interface Team{
    id:string;
    name:string;
    leader:object;
    members: Object[];
    tasks:Object[];
    status:ProjectStatus;
    createdAt: Date;
    updatedAt: Date
  }

  const teamSchema = new Schema<Team>({
      name: {type: String, required: true},
      leader: {type: Object, default:{}},
      members: {type: [Object], default:[]},
      tasks: {type:[Object], default:[]},
      status: {type: String, default:ProjectStatus.NEW},
      
  },{
      timestamps: true,
      toJSON:{
          virtuals: true
      },
      toObject:{
          virtuals: true
      }
  });

  export const TeamModel = model('team', teamSchema);