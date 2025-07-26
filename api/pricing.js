import { storage, insertPricingSchema } from './utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Using direct storage import

  try {
    if (req.method === 'GET') {
      if (req.query.id) {
        const id = parseInt(req.query.id);
        const pricing = await storage.getPricing(id);
        if (!pricing) {
          return res.status(404).json({ message: "Pricing item not found" });
        }
        return res.json(pricing);
      } else {
        const pricing = await storage.getPricings();
        return res.json(pricing);
      }
    } else if (req.method === 'POST') {
      const pricingData = insertPricingSchema.parse(req.body);
      const pricing = await storage.createPricing(pricingData);
      return res.status(201).json(pricing);
    } else if (req.method === 'PUT') {
      const id = parseInt(req.query.id);
      const pricingData = insertPricingSchema.partial().parse(req.body);
      const pricing = await storage.updatePricing(id, pricingData);
      if (!pricing) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      return res.json(pricing);
    } else if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      await storage.deletePricing(id);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Pricing API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 