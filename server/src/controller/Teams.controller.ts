import TeamsService from "../services/Teams.service";

class TeamController {
    constructor() {}

    async getTeams (req:any, res:any) {
        const teams = await TeamsService.getAllTeams();
        res.json(teams);
    }

    async getAllTeamsBySearchTerm (req:any, res: any){
        const term = new RegExp(req.params.searchTerm, 'i');
        const rows = await TeamsService.getAllTeamsBySearchTerm(term);
        res.json(rows);
    }

    async getAllTeamsByTags (req:any, res: any){
        const tag = req.params.tag;
        const rows = await TeamsService.getAllTeamsByTags(tag);
        res.json(rows);
    }

    async createTeams (req:any, res:any) {
        const newTeam = await TeamsService.createTeam(req.body);
        res.json(newTeam);
    }

    async getTeam (req:any, res:any) {
        const id = req.params.id;
        const row = await TeamsService.getTeam(id);
        res.json(row);
    }

    async patchTeam(req:any, res:any) {
        const id = req.params.id;
        const obj = req.body;
        const team = await TeamsService.patchTeam(id, obj);
        res.json(team);
    }

    async deleteTeam (req:any, res:any) {
        const id = req.params.id;
        const team = await  TeamsService.deleteTeam(id);
        res.json(team);
    }
}

export default new TeamController;