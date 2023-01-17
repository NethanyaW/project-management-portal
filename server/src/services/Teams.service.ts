import { TeamModel } from "../models/Team.model";

class TeamService {
    constructor() {}

    async getAllTeams() {
        const teams= await TeamModel.find();
        return teams;
    }

    async getAllTeamsBySearchTerm(term:RegExp):Promise<any[]>{
        return await TeamModel.find({name: {$regex:term}});
    }

    async getAllTeamsByTags(tag:string):Promise<any[]>{
        // if(tag.toLowerCase()==="all"){return sample_teams;} else {return sample_teams.filter(item => item.tags?.includes(tag));}
        const teams = await TeamModel.find({tags: tag})
        return teams;
    }

    async createTeam(team: any) {
        const newTeam = new TeamModel(team);
        const createdTeam = await newTeam.save();
        return createdTeam;
    }

    async getTeam(id: any) {
        const team = await TeamModel.findById(id);
        return team;
        // return sample_teams.find(items=>items.id==id);
    }

    async patchTeam(id: any, obj: any) {
        const team = await TeamModel.findByIdAndUpdate(id, obj);
        return team;
    }

    async deleteTeam(id: any) {
        const delTeam = await TeamModel.findByIdAndDelete(id);
        return delTeam;
    }

}

export default new TeamService;