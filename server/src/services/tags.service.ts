import {ProjectModel} from "../models/Project.model";
import { sample_tags } from "../samples/tags";

class TagService {
    constructor() {}

    async getAllTags() {
        // const iobs = await Tag.find();
        // return sample_tags;
        const tags = await ProjectModel.aggregate([
            {
              $unwind:'$tags'
            },
            {
              $group:{
                _id: '$tags',
                count: {$sum: 1}
              }
            },
            {
              $project:{
                _id: 0,
                name:'$_id',
                count: '$count'
              }
            }
          ]).sort({count: -1});
      
          const all = {
            name : 'All',
            count: await ProjectModel.countDocuments()
          }
      
          tags.unshift(all);
          return tags;
    }

    // async getAllTagsBySearchTerm(term:string):Promise<any[]>{
    //     return sample_Tags.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
    // }

    async createTag(iob: any) {
        // const newTag = new Tag(iob);
        // const createdTag = await newTag.save();
        // return createdTag;
    }

    async getTag(id: any) {
        // const iob = await Tag.findById(id);
        // return iob;
    }

    async putTag(id: any, obj: any) {
        // const iob = await Tag.findByIdAndUpdate(id, obj);
        // return iob;
    }

    async deleteTag(id: any) {
        // const delTag = await Tag.findByIdAndDelete(id);
        // return delTag;
    }

}

export default new TagService;