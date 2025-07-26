import { storage, insertGallerySchema } from './utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('Using direct storage import');

  try {
    if (req.method === 'GET') {
      if (req.query.id) {
        const id = parseInt(req.query.id);
        const gallery = await storage.getGallery(id);
        if (!gallery) {
          return res.status(404).json({ message: "Gallery item not found" });
        }
        return res.json(gallery);
      } else {
        const gallery = await storage.getGalleries();
        return res.json(gallery);
      }
    } else if (req.method === 'POST') {
      const galleryData = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGallery(galleryData);
      return res.status(201).json(gallery);
    } else if (req.method === 'PUT') {
      const id = parseInt(req.query.id);
      const galleryData = insertGallerySchema.partial().parse(req.body);
      const gallery = await storage.updateGallery(id, galleryData);
      if (!gallery) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      return res.json(gallery);
    } else if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      await storage.deleteGallery(id);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Gallery API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 