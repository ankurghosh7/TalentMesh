import { Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.register(req.body);
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = await userService.login(req.body);
      return res.json(data);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async me(req: Request, res: Response) {
    // auth middleware should attach user id
    return res.json({ msg: "implement me (return current user)" });
  }
}
