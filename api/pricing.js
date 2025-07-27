import { storage, insertPricingSchema } from './utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const pricing = await storage.getPricingItems();
      return res.json(pricing);
    } else if (req.method === 'POST') {
      const pricingData = insertPricingSchema.parse(req.body);
      const pricing = await storage.createPricingItem(pricingData);
      return res.status(201).json(pricing);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Pricing API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 