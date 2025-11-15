import { Request, Response } from "express";
import { JobService } from "../services/jobService.js";

const jobService = new JobService();

export class JobController {
  async list(req: Request, res: Response) {
    const data = await jobService.list(req.query);
    res.json(data);
  }

  async create(req: Request & { user?: any }, res: Response) {
    const job = await jobService.create({
      ...req.body,
      clientId: req.user?.id,
    });
    res.json(job);
  }

  async get(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).json({ error: "Job ID is required" });
      return;
    }
    const job = await jobService.get(parseInt(req.params.id));
    res.json(job);
  }

  async bid(req: Request & { user?: any }, res: Response) {
    if (!req.params.id) {
      res.status(400).json({ error: "Job ID is required" });
      return;
    }
    const result = await jobService.bid(
      parseInt(req.params.id),
      req.user!.id,
      req.body
    );
    res.json(result);
  }

  async close(req: Request & { user?: any }, res: Response) {
    if (!req.params.id) {
      res.status(400).json({ error: "Job ID is required" });
      return;
    }
    const closed = await jobService.close(
      parseInt(req.params.id),
      req.user!.id
    );
    res.json(closed);
  }
}
