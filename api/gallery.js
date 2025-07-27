import { storage, insertGallerySchema } from './utils.js';

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
      const gallery = await storage.getGalleryItems();
      return res.json(gallery);
    } else if (req.method === 'POST') {
      const galleryData = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGalleryItem(galleryData);
      return res.status(201).json(gallery);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Gallery API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 