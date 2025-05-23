import { 
  users, 
  prayerRequests, 
  contactMessages
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

export class DatabaseStorage {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createPrayerRequest(insertRequest) {
    const [prayerRequest] = await db
      .insert(prayerRequests)
      .values(insertRequest)
      .returning();
    return prayerRequest;
  }

  async getPrayerRequests() {
    return await db
      .select()
      .from(prayerRequests)
      .orderBy((t) => t.createdAt);
  }

  async getPublicApprovedPrayerRequests() {
    return await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.status, "approved"))
      .orderBy((t) => t.createdAt);
  }

  async getPrayerRequest(id) {
    const [request] = await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.id, id));
    return request || undefined;
  }

  async updatePrayerRequestStatus(id, status) {
    const [updatedRequest] = await db
      .update(prayerRequests)
      .set({ status })
      .where(eq(prayerRequests.id, id))
      .returning();
    return updatedRequest || undefined;
  }

  async createContactMessage(insertMessage) {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return contactMessage;
  }

  async getContactMessages() {
    return await db
      .select()
      .from(contactMessages)
      .orderBy((t) => t.createdAt);
  }
}

export const storage = new DatabaseStorage();