import { storage, insertPricingSchema } from './utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Parse the URL to determine if this is a single item request
    const url = req.url || '';
    const pathParts = url.split('/').filter(part => part);
    const lastPart = pathParts[pathParts.length - 1];
    const isSingleItem = !isNaN(parseInt(lastPart)) && lastPart !== 'pricing';

    console.log('Pricing URL:', url);
    console.log('Path parts:', pathParts);
    console.log('Last part:', lastPart);
    console.log('Is single item:', isSingleItem);

    if (req.method === 'GET') {
      if (isSingleItem) {
        // Get single pricing item
        const id = parseInt(lastPart);
        const item = await storage.getPricingItem(id);
        if (!item) {
          return res.status(404).json({ message: "Pricing item not found" });
        }
        return res.json(item);
      } else {
        // Get all pricing items
        const pricing = await storage.getPricingItems();
        return res.json(pricing);
      }
    } else if (req.method === 'POST') {
      if (isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Create pricing item
      const pricingData = insertPricingSchema.parse(req.body);
      const pricing = await storage.createPricingItem(pricingData);
      return res.status(201).json(pricing);
    } else if (req.method === 'PUT') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Update pricing item
      const id = parseInt(lastPart);
      const pricingData = insertPricingSchema.partial().parse(req.body);
      const item = await storage.updatePricingItem(id, pricingData);
      if (!item) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      return res.json(item);
    } else if (req.method === 'DELETE') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Delete pricing item
      const id = parseInt(lastPart);
      await storage.deletePricingItem(id);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Pricing API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 