export default async (req, res) => {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Return a simple 1x1 gray pixel PNG
    // This is a base64 encoded 1x1 gray PNG image
    const grayPixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jINpPwAAAABJRU5ErkJggg==',
      'base64'
    );

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', grayPixel.length);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.setHeader('ETag', '"placeholder"');
    
    return res.send(grayPixel);
  } catch (error) {
    console.error('Placeholder image error:', error);
    res.status(500).json({ error: 'Failed to generate placeholder' });
  }
}; 