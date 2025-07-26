import { storage, insertHomeContentSchema } from './utils.js';

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
        const content = await storage.getHomeContent(id);
        if (!content) {
          return res.status(404).json({ message: "Home content not found" });
        }
        return res.json(content);
      } else {
        const content = await storage.getHomeContents();
        return res.json(content);
      }
    } else if (req.method === 'POST') {
      const contentData = insertHomeContentSchema.parse(req.body);
      const content = await storage.createHomeContent(contentData);
      return res.status(201).json(content);
    } else if (req.method === 'PUT') {
      const id = parseInt(req.query.id);
      const contentData = insertHomeContentSchema.partial().parse(req.body);
      const content = await storage.updateHomeContent(id, contentData);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      await storage.deleteHomeContent(id);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Home Content API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 