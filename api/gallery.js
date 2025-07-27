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
    // Parse the URL to determine if this is a single item request
    const url = req.url || '';
    const pathParts = url.split('/').filter(part => part);
    const lastPart = pathParts[pathParts.length - 1];
    const isSingleItem = !isNaN(parseInt(lastPart)) && lastPart !== 'gallery';

    console.log('Gallery URL:', url);
    console.log('Path parts:', pathParts);
    console.log('Last part:', lastPart);
    console.log('Is single item:', isSingleItem);

    if (req.method === 'GET') {
      if (isSingleItem) {
        // Get single gallery item
        const id = parseInt(lastPart);
        const item = await storage.getGalleryItem(id);
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
      const id = parseInt(lastPart);
      const galleryData = insertGallerySchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(id, galleryData);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      return res.json(item);
    } else if (req.method === 'DELETE') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Delete gallery item
      const id = parseInt(lastPart);
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