import { ProjectModel } from "../models/Project.model";

class ProjectService {
    constructor() {}

    async getAllProjects() {
        const projects= await ProjectModel.find();
        return projects;
    }

    async getAllProjectsBySearchTerm(term:RegExp):Promise<any[]>{
        return await ProjectModel.find({name: {$regex:term}});
    }

    async getAllProjectsByTags(tag:string):Promise<any[]>{
        // if(tag.toLowerCase()==="all"){return sample_projects;} else {return sample_projects.filter(item => item.tags?.includes(tag));}
        const projects = await ProjectModel.find({tags: tag})
        return projects;
    }

    async createProject(project: any) {
        const newProject = new ProjectModel(project);
        const createdProject = await newProject.save();
        return createdProject;
    }

    async getProject(id: any) {
        const project = await ProjectModel.findById(id);
        return project;
        // return sample_projects.find(items=>items.id==id);
    }

    async patchProject(id: any, obj: any) {
        const project = await ProjectModel.findByIdAndUpdate(id, obj);
        return project;
    }

    async deleteProject(id: any) {
        const delProject = await ProjectModel.findByIdAndDelete(id);
        return delProject;
    }

}

export default new ProjectService;