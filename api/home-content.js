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
    // Check if there's an ID in the URL path
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    const hasId = !isNaN(parseInt(id)) && id !== 'home-content';

    if (req.method === 'GET') {
      if (hasId) {
        // Get single item
        const content = await storage.getHomeContent(parseInt(id));
        if (!content) {
          return res.status(404).json({ message: "Home content not found" });
        }
        return res.json(content);
      } else {
        // Get all items
        const content = await storage.getHomeContents();
        return res.json(content);
      }
    } else if (req.method === 'POST') {
      if (hasId) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      const contentData = insertHomeContentSchema.parse(req.body);
      const content = await storage.createHomeContent(contentData);
      return res.status(201).json(content);
    } else if (req.method === 'PUT') {
      if (!hasId) {
        return res.status(405).json({ message: "Method not allowed" });
      }
      const contentData = insertHomeContentSchema.partial().parse(req.body);
      const content = await storage.updateHomeContent(parseInt(id), contentData);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'DELETE') {
      if (!hasId) {
        return res.status(405).json({ message: "Method not allowed" });
      }
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