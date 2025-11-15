import { hashSync, compareSync } from "bcrypt";
import { jwtSign } from "../utils/jwt.js";
import { db } from "../db/index.js";
import { users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";

export class UserService {
  async register(payload: any) {
    if (!payload.email || !payload.password) throw new Error("missing fields");
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, payload.email));
    if (existing.length) throw new Error("email exists");
    const hashed = hashSync(payload.password, 10);
    const inserted = await db
      .insert(users)
      .values({
        name: payload.name,
        email: payload.email,
        password: hashed,
        free_bids: 10,
        credits: 0,
      })
      .returning();
    const user = inserted[0];
    if (!user) throw new Error("registration failed");
    const token = jwtSign({ id: user.id });
    return { token, user };
  }

  async login(payload: any) {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, payload.email));
    const user = rows[0];
    if (!user || !compareSync(payload.password, user.password))
      throw new Error("invalid credentials");
    const token = jwtSign({ id: user.id });
    return { token, user };
  }
}
