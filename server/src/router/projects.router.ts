import { Router } from 'express';
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status';
import ProjectsController from '../controller/Projects.controller';
import TagsController from '../controller/Tags.controller';
import { ProjectModel } from '../models/Project.model';
import RateModel from '../models/rate.model';

const app = Router();

// app.get('/seed', asyncHandler(async (req, res) => {
//     const projectCount = await ProjectModel.countDocuments();
//     if(projectCount>0) {
//         res.send("Projects are Seeding...");
//         return;
//     }
//     // await ProjectModel.create(sample_projects);
//     res.send("Seeding is done");
// }))

app.route('/')
    .get(ProjectsController.getProjects)
    .post(ProjectsController.createProjects);

app.route('/project/:id')
    .get(ProjectsController.getProject)
    .patch(ProjectsController.patchProject)
    .delete(ProjectsController.deleteProject);

app.route('/search/:searchTerm')
    .get(ProjectsController.getAllProjectsBySearchTerm);

app.route('/tag/:tag')
    .get(ProjectsController.getAllProjectsByTags);

app.route('/tags')
    .get(TagsController.getTags);

// app.route('/rate/:item').get(asyncHandler(async (req, res) => {
//     const item = req.params.item;
//     const rates:any[] = await RateModel.find({item});
//     if(!rates) {
//         res.status(httpStatus.NOT_FOUND).send("No Rratings available");
//         return;
//     }
//     res.send({rates:rates[0].rates, raters:rates[0].rates.length, all:rates[0]});
// }));
// app.route('/rate/:item').patch(asyncHandler(async (req, res) => {
    
//     const itemID = req.params.item;
//     const rate = req.body;
//     var rates = await RateModel.findOneAndUpdate({item: itemID}, rate);
//     if(!rates) {
//         rates = await RateModel.create(rate);
//     }
//     res.send(rates);
// }));

export default app;