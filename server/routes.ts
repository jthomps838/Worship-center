import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPrayerRequestSchema, 
  insertContactMessageSchema,
  updatePrayerRequestStatusSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prayer requests
  app.post("/api/prayer-requests", async (req, res) => {
    try {
      const validatedData = insertPrayerRequestSchema.parse(req.body);
      const prayerRequest = await storage.createPrayerRequest(validatedData);
      
      // In a real app, you would send email notifications here if needsFollowUp is true
      if (prayerRequest.needsFollowUp && prayerRequest.email) {
        console.log(`Follow-up requested for prayer: ${prayerRequest.email}`);
      }
      
      res.json(prayerRequest);
    } catch (error) {
      res.status(400).json({ message: "Invalid prayer request data" });
    }
  });

  app.get("/api/prayer-requests", async (req, res) => {
    try {
      const requests = await storage.getPrayerRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prayer requests" });
    }
  });

  app.get("/api/prayer-requests/public", async (req, res) => {
    try {
      const requests = await storage.getPublicApprovedPrayerRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch public prayer requests" });
    }
  });

  app.patch("/api/prayer-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = updatePrayerRequestStatusSchema.parse(req.body);
      
      const updatedRequest = await storage.updatePrayerRequestStatus(id, status);
      
      if (!updatedRequest) {
        return res.status(404).json({ message: "Prayer request not found" });
      }
      
      res.json(updatedRequest);
    } catch (error) {
      res.status(400).json({ message: "Invalid status update data" });
    }
  });

  // Contact messages
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // In a real app, you would send email notifications here
      console.log(`Contact message received from: ${contactMessage.email}`);
      
      res.json(contactMessage);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact message data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
