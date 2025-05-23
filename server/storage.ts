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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private prayerRequests: Map<number, PrayerRequest>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentPrayerRequestId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.prayerRequests = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentPrayerRequestId = 1;
    this.currentContactMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPrayerRequest(insertRequest: InsertPrayerRequest): Promise<PrayerRequest> {
    const id = this.currentPrayerRequestId++;
    const prayerRequest: PrayerRequest = {
      ...insertRequest,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.prayerRequests.set(id, prayerRequest);
    return prayerRequest;
  }

  async getPrayerRequests(): Promise<PrayerRequest[]> {
    return Array.from(this.prayerRequests.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getPublicApprovedPrayerRequests(): Promise<PrayerRequest[]> {
    return Array.from(this.prayerRequests.values())
      .filter(request => request.isPublic && request.status === "approved")
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getPrayerRequest(id: number): Promise<PrayerRequest | undefined> {
    return this.prayerRequests.get(id);
  }

  async updatePrayerRequestStatus(id: number, status: string): Promise<PrayerRequest | undefined> {
    const request = this.prayerRequests.get(id);
    if (request) {
      const updatedRequest = { ...request, status };
      this.prayerRequests.set(id, updatedRequest);
      return updatedRequest;
    }
    return undefined;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const contactMessage: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
