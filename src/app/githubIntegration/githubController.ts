import { Request, Response } from 'express';
import githubService from './githubService';

export default {
    getRepos: async (req: Request, res: Response): Promise<any> => {
        const qs = req.query

        try {
            const org = req.query.org ? String(req.query.org) : process.env.ORG;
            const lang = req.query.lang ? decodeURIComponent(String(req.query.lang)) : process.env.LANGUAGE;
            const quantity = req.query.quantity ? parseInt(req.query.quantity as string, 10) : 5;
            const order = req.query.order ? String(req.query.order) : 'asc';

            if (!org) {
                return res.status(400).json({ message: 'Org is required' });
            }

            if (order != 'asc' && order != 'desc') {
                return res.status(400).json({ message: 'Order invalid' });
            }

            const repos = await githubService.getReposFromOrg({ org, lang, quantity, order });

            return res.status(200).json({ message: "sucess", repos });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

}

