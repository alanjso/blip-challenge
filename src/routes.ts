import { Router } from 'express';
import githubRouter from './app/githubIntegration/githubRouter';

const routes: Router = Router();

routes.get('/health', (req, res) => {
    res.status(200).json({ blipChallenge: 'Application /v1 Up' });
});

githubRouter(routes);

export default routes;