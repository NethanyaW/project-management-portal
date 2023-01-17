import ProjectsService from "../services/Projects.service";

class ProjectController {
    constructor() {}

    async getProjects (req:any, res:any) {
        const projects = await ProjectsService.getAllProjects();
        res.json(projects);
    }

    async getAllProjectsBySearchTerm (req:any, res: any){
        const term = new RegExp(req.params.searchTerm, 'i');
        const rows = await ProjectsService.getAllProjectsBySearchTerm(term);
        res.json(rows);
    }

    async getAllProjectsByTags (req:any, res: any){
        const tag = req.params.tag;
        const rows = await ProjectsService.getAllProjectsByTags(tag);
        res.json(rows);
    }

    async createProjects (req:any, res:any) {
        const newProject = await ProjectsService.createProject(req.body);
        res.json(newProject);
    }

    async getProject (req:any, res:any) {
        const id = req.params.id;
        const row = await ProjectsService.getProject(id);
        res.json(row);
    }

    async patchProject(req:any, res:any) {
        const id = req.params.id;
        const obj = req.body;
        const project = await ProjectsService.patchProject(id, obj);
        res.json(project);
    }

    async deleteProject (req:any, res:any) {
        const id = req.params.id;
        const project = await  ProjectsService.deleteProject(id);
        res.json(project);
    }
}

export default new ProjectController;