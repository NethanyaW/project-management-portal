import mongoose, { model, Types } from 'mongoose';
import { ProjectStatus } from '../samples/project_status';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

export interface Task {
    id:string,
    name:string,
    info:string,
    allocated:Types.ObjectId,
    deadline:Date,
    status:ProjectStatus
}

export const TaskSchema = new Schema<Task>(
    {
        name:{type: String, required: true},
        info:{type: String},
        allocated: {type: Schema.Types.ObjectId},
        deadline:{ type: Date, required:true},
        status: {type: String, required:true, default:ProjectStatus.NEW}
    }
);

export interface Project{
    id:string;
    name:string;
    info:string;
    leader:object;
    team:object[];
    deadline: Date;
    tags:string[];
    tasks:Task[];
    user: Types.ObjectId;
    status:ProjectStatus;
    createdAt: Date;
    updatedAt: Date
  }

  const projectSchema = new Schema<Project>({
      name: {type: String, required: true},
      info: {type: String},
      leader: {type: Object, default:{}},
      team: {type: [Object], default:[]},
      deadline: {type: Date},
      tags: {type:[String]},
      tasks: {type:[TaskSchema], default:[]},
      user: {type: Schema.Types.ObjectId, required: true},
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

  export const ProjectModel = model('project', projectSchema);