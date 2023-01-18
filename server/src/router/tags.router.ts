import { Router } from 'express';
import TagsController from '../controller/Tags.controller';

const app = Router();

app.route('/')
    .get(TagsController.getTags);

export default app;