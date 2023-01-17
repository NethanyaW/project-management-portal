import TagsService from "../services/Tags.service";

class TagController {
    constructor() {}

    async getTags (req:any, res:any) {
        const staffs = await TagsService.getAllTags();
        res.json(staffs);
    }

    async createTags (req:any, res:any) {
        const newTag = await TagsService.createTag(req.body);
        res.json(newTag);
    }

    async getTag (req:any, res:any) {
        const id = req.params.id;
        const staff = await TagsService.getTag(id);
        res.json(staff);
    }

    async putTag(req:any, res:any) {
        const id = req.params.id;
        const obj = req.body;
        const staff = await TagsService.putTag(id, obj);
        res.json(staff);
    }

    async deleteTag (req:any, res:any) {
        const id = req.params.id;
        const staff = await  TagsService.deleteTag(id);
        res.json(staff);
    }
}

export default new TagController;