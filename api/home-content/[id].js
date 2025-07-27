import { storage, insertHomeContentSchema } from '../utils.js';

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
      const content = await storage.getHomeContent(id);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'PUT') {
      const contentData = insertHomeContentSchema.partial().parse(req.body);
      const content = await storage.updateHomeContent(id, contentData);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'DELETE') {
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