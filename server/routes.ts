import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertGallerySchema, insertPricingSchema, insertHomeContentSchema, loginSchema } from "@shared/schema";
import jwt from 'jsonwebtoken';
// Node.js 22+ has built-in fetch

// JWT secret from environment variable - required for production
const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET || 'dev-fallback-key-not-for-production';

export async function registerRoutes(app: Express): Promise<Server | Express> {
  // Authentication routes
  app.post("/api/login", async (req, res) => {
    try {
      console.log(`${req.method} request to /api/login`);
      
      // Validate request body
      const { username, password } = loginSchema.parse(req.body);

      // Find user in database
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          message: 'Username or password is incorrect'
        });
      }

      // Simple password comparison (in production, use bcrypt for hashed passwords)
      if (user.password !== password) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          message: 'Username or password is incorrect'
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Return success with token and user info (without password)
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });

         } catch (error: any) {
       console.error('Login API Error:', error);
       
       if (error.name === 'ZodError') {
         return res.status(400).json({ 
           error: 'Validation error',
           details: error.errors
         });
       }
      
      return res.status(500).json({ 
        error: 'Internal server error',
        message: 'Login failed'
      });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const gallery = await storage.getGalleryItems();
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getGalleryItem(id);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const itemData = insertGallerySchema.parse(req.body);
      const item = await storage.createGalleryItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid gallery item data" });
    }
  });

  app.put("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itemData = insertGallerySchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(id, itemData);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid gallery item data" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGalleryItem(id);
      if (!deleted) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery item" });
    }
  });

  // Pricing routes
  app.get("/api/pricing", async (req, res) => {
    try {
      const pricing = await storage.getPricingItems();
      res.json(pricing);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pricing items" });
    }
  });

  app.get("/api/pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getPricingItem(id);
      if (!item) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pricing item" });
    }
  });

  app.post("/api/pricing", async (req, res) => {
    try {
      const itemData = insertPricingSchema.parse(req.body);
      const item = await storage.createPricingItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid pricing item data" });
    }
  });

  app.put("/api/pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itemData = insertPricingSchema.partial().parse(req.body);
      const item = await storage.updatePricingItem(id, itemData);
      if (!item) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid pricing item data" });
    }
  });

  app.delete("/api/pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePricingItem(id);
      if (!deleted) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete pricing item" });
    }
  });

  // Home content routes
  app.get("/api/home-content", async (req, res) => {
    try {
      const content = await storage.getHomeContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch home content" });
    }
  });

  app.get("/api/home-content/section/:section", async (req, res) => {
    try {
      const section = req.params.section;
      const content = await storage.getHomeContentBySection(section);
      if (!content) {
        return res.status(404).json({ message: "Home content section not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch home content section" });
    }
  });

  app.post("/api/home-content", async (req, res) => {
    try {
      // Validate and clean content before saving
      let contentData = { ...req.body };
      if (contentData.content) {
        // Sections that use content as plain text (not JSON)
        const plainTextSections = ['about'];
        
        if (plainTextSections.includes(contentData.section)) {
          // For plain text sections, keep content as string
          if (typeof contentData.content !== 'string') {
            contentData.content = String(contentData.content);
          }
        } else {
          // For other sections, ensure content is valid JSON
          if (typeof contentData.content === 'string') {
            try {
              JSON.parse(contentData.content);
            } catch {
              return res.status(400).json({ message: "Invalid JSON in content field" });
            }
          } else if (Array.isArray(contentData.content)) {
            // Convert array to JSON string for proper storage
            contentData.content = JSON.stringify(contentData.content);
          } else if (typeof contentData.content === 'object') {
            // Convert object to JSON string
            contentData.content = JSON.stringify(contentData.content);
          }
        }
      }
      
      // Validate after content processing
      const validatedData = insertHomeContentSchema.parse(contentData);
      const content = await storage.createHomeContent(validatedData);
      res.status(201).json(content);
    } catch (error) {
      console.error('Home content creation error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Validation error", details: error.errors });
      }
      res.status(400).json({ message: "Invalid home content data" });
    }
  });

  app.put("/api/home-content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Validate and clean content before saving
      let contentData = { ...req.body };
      console.log('PUT /api/home-content - Original contentData:', JSON.stringify(contentData, null, 2));
      if (contentData.content) {
        // Sections that use content as plain text (not JSON)
        const plainTextSections = ['about'];
        
        if (plainTextSections.includes(contentData.section)) {
          // For plain text sections, keep content as string
          if (typeof contentData.content !== 'string') {
            contentData.content = String(contentData.content);
          }
        } else {
          // For other sections, ensure content is valid JSON
          if (typeof contentData.content === 'string') {
            try {
              JSON.parse(contentData.content);
            } catch {
              return res.status(400).json({ message: "Invalid JSON in content field" });
            }
          } else if (Array.isArray(contentData.content)) {
            // Convert array to JSON string for proper storage
            contentData.content = JSON.stringify(contentData.content);
          } else if (typeof contentData.content === 'object') {
            // Convert object to JSON string
            contentData.content = JSON.stringify(contentData.content);
          }
        }
      }
      
      console.log('PUT /api/home-content - After processing:', JSON.stringify(contentData, null, 2));
      // Validate after content processing
      const validatedData = insertHomeContentSchema.partial().parse(contentData);
      const content = await storage.updateHomeContent(id, validatedData);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      res.json(content);
    } catch (error) {
      console.error('Home content update error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Validation error", details: error.errors });
      }
      res.status(400).json({ message: "Invalid home content data" });
    }
  });

  app.delete("/api/home-content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteHomeContent(id);
      if (!deleted) {
        return res.status(404).json({ message: "Home content not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete home content" });
    }
  });

  // Placeholder image endpoint
  app.get("/api/placeholder-image", (req, res) => {
    // Simple 1x1 gray pixel as placeholder
    const pixel = Buffer.from([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1,
      0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 10, 73, 68, 65, 84,
      120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 219, 165, 0, 0, 0, 0, 73, 69,
      78, 68, 174, 66, 96, 130
    ]);
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.send(pixel);
  });

  // Test endpoint to verify route registration
  app.get("/api/test-proxy", (req, res) => {
    res.json({ message: "Proxy endpoint is working!" });
  });

  // Google Drive image proxy endpoint
  app.get("/api/proxy-image", async (req, res) => {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL parameter required' });
    }

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.startsWith('image/')) {
        throw new Error('Not an image');
      }

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      
      const imageBuffer = await response.arrayBuffer();
      res.send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error('Proxy image error:', error);
      res.status(500).json({ error: 'Failed to fetch image' });
    }
  });

  // For Vercel deployment, don't create HTTP server
  if (process.env.NODE_ENV !== "production") {
    const httpServer = createServer(app);
    return httpServer;
  }
  
  return app;
}
