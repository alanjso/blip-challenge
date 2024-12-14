import { Router } from 'express';
import githubController from "./githubController";

export default (router: Router) => {
    const SERVICE: string = '/github';

    router.get(`${SERVICE}/repos`, githubController.getRepos);

};