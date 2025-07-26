import { 
  users, 
  type User, 
  type InsertUser,
  products,
  type Product,
  type InsertProduct,
  gallery,
  type Gallery,
  type InsertGallery,
  pricing,
  type Pricing,
  type InsertPricing,
  homeContent,
  type HomeContent,
  type InsertHomeContent
} from "@shared/schema";
import { db } from "./supabase";
import { eq, desc, asc } from "drizzle-orm";

// Storage interface remains the same
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Gallery methods
  getGalleryItems(): Promise<Gallery[]>;
  getGalleryItem(id: number): Promise<Gallery | undefined>;
  createGalleryItem(item: InsertGallery): Promise<Gallery>;
  updateGalleryItem(id: number, item: Partial<InsertGallery>): Promise<Gallery | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;
  
  // Pricing methods
  getPricingItems(): Promise<Pricing[]>;
  getPricingItem(id: number): Promise<Pricing | undefined>;
  createPricingItem(item: InsertPricing): Promise<Pricing>;
  updatePricingItem(id: number, item: Partial<InsertPricing>): Promise<Pricing | undefined>;
  deletePricingItem(id: number): Promise<boolean>;
  
  // Home content methods
  getHomeContent(): Promise<HomeContent[]>;
  getHomeContentBySection(section: string): Promise<HomeContent | undefined>;
  createHomeContent(content: InsertHomeContent): Promise<HomeContent>;
  updateHomeContent(id: number, content: Partial<InsertHomeContent>): Promise<HomeContent | undefined>;
  deleteHomeContent(id: number): Promise<boolean>;
}

export class SupabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(asc(products.sortOrder), asc(products.id));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const productData = {
      name: insertProduct.name,
      description: insertProduct.description || null,
      price: insertProduct.price || null,
      category: insertProduct.category || null,
      image: insertProduct.image || null,
      isActive: insertProduct.isActive ?? true,
      sortOrder: insertProduct.sortOrder || 0,
    };
    
    const result = await db.insert(products).values(productData).returning();
    return result[0];
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const updateData: any = {};
    
    if (productUpdate.name !== undefined) updateData.name = productUpdate.name;
    if (productUpdate.description !== undefined) updateData.description = productUpdate.description || null;
    if (productUpdate.price !== undefined) updateData.price = productUpdate.price || null;
    if (productUpdate.category !== undefined) updateData.category = productUpdate.category || null;
    if (productUpdate.image !== undefined) updateData.image = productUpdate.image || null;
    if (productUpdate.isActive !== undefined) updateData.isActive = productUpdate.isActive;
    if (productUpdate.sortOrder !== undefined) updateData.sortOrder = productUpdate.sortOrder || 0;
    
    updateData.updatedAt = new Date();
    
    const result = await db.update(products).set(updateData).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  // Gallery methods
  async getGalleryItems(): Promise<Gallery[]> {
    return await db.select().from(gallery).orderBy(asc(gallery.sortOrder), asc(gallery.id));
  }

  async getGalleryItem(id: number): Promise<Gallery | undefined> {
    const result = await db.select().from(gallery).where(eq(gallery.id, id)).limit(1);
    return result[0];
  }

  async createGalleryItem(insertGallery: InsertGallery): Promise<Gallery> {
    const galleryData = {
      title: insertGallery.title,
      description: insertGallery.description || null,
      image: insertGallery.image,
      category: insertGallery.category || null,
      isActive: insertGallery.isActive ?? true,
      sortOrder: insertGallery.sortOrder || 0,
    };
    
    const result = await db.insert(gallery).values(galleryData).returning();
    return result[0];
  }

  async updateGalleryItem(id: number, itemUpdate: Partial<InsertGallery>): Promise<Gallery | undefined> {
    const updateData: any = {};
    
    if (itemUpdate.title !== undefined) updateData.title = itemUpdate.title;
    if (itemUpdate.description !== undefined) updateData.description = itemUpdate.description || null;
    if (itemUpdate.image !== undefined) updateData.image = itemUpdate.image;
    if (itemUpdate.category !== undefined) updateData.category = itemUpdate.category || null;
    if (itemUpdate.isActive !== undefined) updateData.isActive = itemUpdate.isActive;
    if (itemUpdate.sortOrder !== undefined) updateData.sortOrder = itemUpdate.sortOrder || 0;
    
    updateData.updatedAt = new Date();
    
    const result = await db.update(gallery).set(updateData).where(eq(gallery.id, id)).returning();
    return result[0];
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    const result = await db.delete(gallery).where(eq(gallery.id, id)).returning();
    return result.length > 0;
  }

  // Pricing methods
  async getPricingItems(): Promise<Pricing[]> {
    return await db.select().from(pricing).orderBy(asc(pricing.sortOrder), asc(pricing.id));
  }

  async getPricingItem(id: number): Promise<Pricing | undefined> {
    const result = await db.select().from(pricing).where(eq(pricing.id, id)).limit(1);
    return result[0];
  }

  async createPricingItem(insertPricing: InsertPricing): Promise<Pricing> {
    const pricingData = {
      serviceName: insertPricing.serviceName,
      price: insertPricing.price,
      category: insertPricing.category,
      description: insertPricing.description || null,
      duration: insertPricing.duration || null,
      isActive: insertPricing.isActive ?? true,
      sortOrder: insertPricing.sortOrder || 0,
    };
    
    const result = await db.insert(pricing).values(pricingData).returning();
    return result[0];
  }

  async updatePricingItem(id: number, itemUpdate: Partial<InsertPricing>): Promise<Pricing | undefined> {
    const updateData: any = {};
    
    if (itemUpdate.serviceName !== undefined) updateData.serviceName = itemUpdate.serviceName;
    if (itemUpdate.price !== undefined) updateData.price = itemUpdate.price;
    if (itemUpdate.category !== undefined) updateData.category = itemUpdate.category;
    if (itemUpdate.description !== undefined) updateData.description = itemUpdate.description || null;
    if (itemUpdate.duration !== undefined) updateData.duration = itemUpdate.duration || null;
    if (itemUpdate.isActive !== undefined) updateData.isActive = itemUpdate.isActive;
    if (itemUpdate.sortOrder !== undefined) updateData.sortOrder = itemUpdate.sortOrder || 0;
    
    updateData.updatedAt = new Date();
    
    const result = await db.update(pricing).set(updateData).where(eq(pricing.id, id)).returning();
    return result[0];
  }

  async deletePricingItem(id: number): Promise<boolean> {
    const result = await db.delete(pricing).where(eq(pricing.id, id)).returning();
    return result.length > 0;
  }

  // Home content methods
  async getHomeContent(): Promise<HomeContent[]> {
    return await db.select().from(homeContent).orderBy(asc(homeContent.id));
  }

  async getHomeContentBySection(section: string): Promise<HomeContent | undefined> {
    const result = await db.select().from(homeContent).where(eq(homeContent.section, section)).limit(1);
    return result[0];
  }

  async createHomeContent(insertHomeContent: InsertHomeContent): Promise<HomeContent> {
    const contentData = {
      section: insertHomeContent.section,
      title: insertHomeContent.title || null,
      subtitle: insertHomeContent.subtitle || null,
      description: insertHomeContent.description || null,
      content: insertHomeContent.content || null,
      image: insertHomeContent.image || null,
      isActive: insertHomeContent.isActive ?? true,
    };
    
    const result = await db.insert(homeContent).values(contentData).returning();
    return result[0];
  }

  async updateHomeContent(id: number, contentUpdate: Partial<InsertHomeContent>): Promise<HomeContent | undefined> {
    const updateData: any = {};
    
    if (contentUpdate.section !== undefined) updateData.section = contentUpdate.section;
    if (contentUpdate.title !== undefined) updateData.title = contentUpdate.title || null;
    if (contentUpdate.subtitle !== undefined) updateData.subtitle = contentUpdate.subtitle || null;
    if (contentUpdate.description !== undefined) updateData.description = contentUpdate.description || null;
    if (contentUpdate.content !== undefined) updateData.content = contentUpdate.content || null;
    if (contentUpdate.image !== undefined) updateData.image = contentUpdate.image || null;
    if (contentUpdate.isActive !== undefined) updateData.isActive = contentUpdate.isActive;
    
    updateData.updatedAt = new Date();
    
    const result = await db.update(homeContent).set(updateData).where(eq(homeContent.id, id)).returning();
    return result[0];
  }

  async deleteHomeContent(id: number): Promise<boolean> {
    const result = await db.delete(homeContent).where(eq(homeContent.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new SupabaseStorage();
