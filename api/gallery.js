import { storage, insertGallerySchema } from './utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Parse query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get('id');
    const isSingleItem = id && !isNaN(parseInt(id));

    console.log('Gallery URL:', req.url);
    console.log('Query ID:', id);
    console.log('Is single item:', isSingleItem);

    if (req.method === 'GET') {
      if (isSingleItem) {
        // Get single gallery item
        const item = await storage.getGalleryItem(parseInt(id));
        if (!item) {
          return res.status(404).json({ message: "Gallery item not found" });
        }
        return res.json(item);
      } else {
        // Get all gallery items
        const gallery = await storage.getGalleryItems();
        return res.json(gallery);
      }
    } else if (req.method === 'POST') {
      if (isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Create gallery item
      const galleryData = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGalleryItem(galleryData);
      return res.status(201).json(gallery);
    } else if (req.method === 'PUT') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Update gallery item
      const galleryData = insertGallerySchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(parseInt(id), galleryData);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      return res.json(item);
    } else if (req.method === 'DELETE') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Delete gallery item
      await storage.deleteGalleryItem(parseInt(id));
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Gallery API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 