import { storage, insertGallerySchema } from '../utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // In Vercel, the ID is available in req.query.id
    const id = parseInt(req.query.id);
    
    if (req.method === 'GET') {
      const item = await storage.getGalleryItem(id);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      return res.json(item);
    } else if (req.method === 'PUT') {
      const itemData = insertGallerySchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(id, itemData);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      return res.json(item);
    } else if (req.method === 'DELETE') {
      await storage.deleteGalleryItem(id);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Gallery API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 