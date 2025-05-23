import { 
  users, 
  prayerRequests, 
  contactMessages,
  type User, 
  type InsertUser,
  type PrayerRequest,
  type InsertPrayerRequest,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prayer requests
  createPrayerRequest(request: InsertPrayerRequest): Promise<PrayerRequest>;
  getPrayerRequests(): Promise<PrayerRequest[]>;
  getPublicApprovedPrayerRequests(): Promise<PrayerRequest[]>;
  getPrayerRequest(id: number): Promise<PrayerRequest | undefined>;
  updatePrayerRequestStatus(id: number, status: string): Promise<PrayerRequest | undefined>;
  
  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createPrayerRequest(insertRequest: InsertPrayerRequest): Promise<PrayerRequest> {
    const [prayerRequest] = await db
      .insert(prayerRequests)
      .values(insertRequest)
      .returning();
    return prayerRequest;
  }

  async getPrayerRequests(): Promise<PrayerRequest[]> {
    return await db
      .select()
      .from(prayerRequests)
      .orderBy((t) => t.createdAt);
  }

  async getPublicApprovedPrayerRequests(): Promise<PrayerRequest[]> {
    return await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.status, "approved"))
      .orderBy((t) => t.createdAt);
  }

  async getPrayerRequest(id: number): Promise<PrayerRequest | undefined> {
    const [request] = await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.id, id));
    return request || undefined;
  }

  async updatePrayerRequestStatus(id: number, status: string): Promise<PrayerRequest | undefined> {
    const [updatedRequest] = await db
      .update(prayerRequests)
      .set({ status })
      .where(eq(prayerRequests.id, id))
      .returning();
    return updatedRequest || undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy((t) => t.createdAt);
  }
}

export const storage = new DatabaseStorage();
