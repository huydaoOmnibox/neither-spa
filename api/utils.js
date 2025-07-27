import 'dotenv/config';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm/pg-core";
import { asc, desc } from "drizzle-orm";
import { z } from "zod";

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const client = postgres(connectionString, { 
  max: 1,
  ssl: 'require'
});
export const db = drizzle(client);

// Schema definitions
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  customerId: integer("customer_id"),
});

export const customer = pgTable("customer", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price"),
  category: text("category"),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  category: text("category"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pricing = pgTable("pricing", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: text("price"),
  category: text("category"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const homeContent = pgTable("home_content", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id"),
  section: text("section").notNull(),
  title: text("title"),
  subtitle: text("subtitle"),
  description: text("description"),
  content: text("content"), // JSON content as text
  image: text("image"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  customerId: z.number().optional(),
});

export const insertProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const insertGallerySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const insertPricingSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const insertHomeContentSchema = z.object({
  customerId: z.number().optional(),
  section: z.string(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  content: z.array(z.string()).optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});

// Storage functions
export const storage = {
  // Authentication
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  },
  
  async createUser(userData) {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  },

  // Products
  async getProducts() {
    return await db.select().from(products).orderBy(asc(products.sortOrder));
  },
  
  async getProduct(id) {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  },
  
  async createProduct(product) {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  },
  
  async updateProduct(id, product) {
    const result = await db.update(products).set({
      ...product,
      updatedAt: new Date()
    }).where(eq(products.id, id)).returning();
    return result[0];
  },
  
  async deleteProduct(id) {
    await db.delete(products).where(eq(products.id, id));
    return true;
  },

  // Gallery
  async getGalleryItems() {
    return await db.select().from(gallery).orderBy(asc(gallery.sortOrder));
  },
  
  async getGalleryItem(id) {
    const result = await db.select().from(gallery).where(eq(gallery.id, id));
    return result[0];
  },
  
  async createGalleryItem(item) {
    const result = await db.insert(gallery).values(item).returning();
    return result[0];
  },
  
  async updateGalleryItem(id, item) {
    const result = await db.update(gallery).set({
      ...item,
      updatedAt: new Date()
    }).where(eq(gallery.id, id)).returning();
    return result[0];
  },
  
  async deleteGalleryItem(id) {
    await db.delete(gallery).where(eq(gallery.id, id));
    return true;
  },

  // Pricing
  async getPricingItems() {
    return await db.select().from(pricing).orderBy(asc(pricing.sortOrder));
  },
  
  async getPricingItem(id) {
    const result = await db.select().from(pricing).where(eq(pricing.id, id));
    return result[0];
  },
  
  async createPricingItem(item) {
    const result = await db.insert(pricing).values(item).returning();
    return result[0];
  },
  
  async updatePricingItem(id, item) {
    const result = await db.update(pricing).set({
      ...item,
      updatedAt: new Date()
    }).where(eq(pricing.id, id)).returning();
    return result[0];
  },
  
  async deletePricingItem(id) {
    await db.delete(pricing).where(eq(pricing.id, id));
    return true;
  },

  // Home Content
  async getHomeContent() {
    return await db.select().from(homeContent).orderBy(asc(homeContent.sortOrder));
  },
  
  async getHomeContentItem(id) {
    const result = await db.select().from(homeContent).where(eq(homeContent.id, id));
    return result[0];
  },
  
  async createHomeContentItem(item) {
    const result = await db.insert(homeContent).values(item).returning();
    return result[0];
  },
  
  async updateHomeContentItem(id, item) {
    const result = await db.update(homeContent).set({
      ...item,
      updatedAt: new Date()
    }).where(eq(homeContent.id, id)).returning();
    return result[0];
  },
  
  async deleteHomeContentItem(id) {
    await db.delete(homeContent).where(eq(homeContent.id, id));
    return true;
  },

  // Aliases for API compatibility
  async getHomeContents() {
    return this.getHomeContent();
  },
  
  async getHomeContent(id) {
    if (id) {
      return this.getHomeContentItem(id);
    }
    return await db.select().from(homeContent).orderBy(asc(homeContent.sortOrder));
  },
  
  async createHomeContent(item) {
    return this.createHomeContentItem(item);
  },
  
  async updateHomeContent(id, item) {
    return this.updateHomeContentItem(id, item);
  },
  
  async deleteHomeContent(id) {
    return this.deleteHomeContentItem(id);
  }
}; 