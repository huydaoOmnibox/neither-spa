import { storage, insertProductSchema } from './utils.js';

export default async (req, res) => {
  try {
    console.log(`${req.method} request to /api/products`);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Check if there's an ID in the URL path
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    const hasId = !isNaN(parseInt(id)) && id !== 'products';

    if (req.method === 'GET') {
      if (hasId) {
        // Get single product
        const product = await storage.getProduct(parseInt(id));
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.json(product);
      } else {
        // Get all products
        const products = await storage.getProducts();
        return res.json(products);
      }
    } else if (req.method === 'POST') {
      if (hasId) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Create product
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      return res.status(201).json(product);
    } else if (req.method === 'PUT') {
      if (!hasId) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Update product
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(parseInt(id), productData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    } else if (req.method === 'DELETE') {
      if (!hasId) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Delete product
      await storage.deleteProduct(parseInt(id));
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}; 