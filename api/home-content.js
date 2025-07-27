import { storage, insertHomeContentSchema } from './utils.js';

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

    console.log('Home Content URL:', req.url);
    console.log('Query ID:', id);
    console.log('Is single item:', isSingleItem);

    if (req.method === 'GET') {
      if (isSingleItem) {
        // Get single home content item
        const content = await storage.getHomeContent(parseInt(id));
        if (!content) {
          return res.status(404).json({ message: "Home content not found" });
        }
        return res.json(content);
      } else {
        // Get all home content items
        const content = await storage.getHomeContents();
        return res.json(content);
      }
    } else if (req.method === 'POST') {
      if (isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      const contentData = insertHomeContentSchema.parse(req.body);
      const content = await storage.createHomeContent(contentData);
      return res.status(201).json(content);
    } else if (req.method === 'PUT') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Update home content item
      const contentData = insertHomeContentSchema.partial().parse(req.body);
      const content = await storage.updateHomeContent(parseInt(id), contentData);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'DELETE') {
      if (!isSingleItem) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      // Delete home content item
      await storage.deleteHomeContent(parseInt(id));
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Home Content API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 