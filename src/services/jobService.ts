import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { bids } from "../db/schema/bids.js";
import { jobs } from "../db/schema/jobs.js";
import { users } from "../db/schema/users.js";

export class JobService {
  async list(query: any) {
    const rows = await db.select().from(jobs).limit(50);
    return rows;
  }

  async create(payload: any) {
    const inserted = await db
      .insert(jobs)
      .values({
        title: payload.title,
        description: payload.description,
        client_id: payload.clientId,
      })
      .returning();
    return inserted[0];
  }

  async get(id: number) {
    const row = await db.select().from(jobs).where(eq(jobs.id, id));
    return row[0];
  }

  async bid(jobId: number, freelancerId: number, payload: any) {
    // decrement free_bids or credits transactionally
    return await db.transaction(async (tx) => {
      const userRow = await tx
        .select()
        .from(users)
        .where(eq(users.id, freelancerId));
      const user = userRow[0];
      if (!user) throw new Error("user not found");
      if (user.free_bids !== null && user.free_bids > 0) {
        await tx
          .update(users)
          .set({ free_bids: user.free_bids - 1 })
          .where(eq(users.id, freelancerId));
      } else if (user.credits !== null && user.credits > 0) {
        await tx
          .update(users)
          .set({ credits: user.credits - 1 })
          .where(eq(users.id, freelancerId));
      } else {
        throw new Error("no bids left");
      }
      const inserted = await tx
        .insert(bids)
        .values({
          job_id: jobId,
          freelancer_id: freelancerId,
          amount: payload.amount,
          cover: payload.cover,
        })
        .returning();
      return inserted[0];
    });
  }

  async close(jobId: number, clientId: number) {
    const jobRow = await db.select().from(jobs).where(eq(jobs.id, jobId));
    const job = jobRow[0];
    if (!job) throw new Error("job not found");
    if (job.client_id !== clientId) throw new Error("not owner");
    await db.update(jobs).set({ is_open: false }).where(eq(jobs.id, jobId));
    return { success: true };
  }
}
