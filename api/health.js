export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy', 
    message: 'Nails of the Netherlands API is running',
    timestamp: new Date().toISOString()
  });
} 