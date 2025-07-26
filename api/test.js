module.exports = async (req, res) => {
  try {
    console.log(`Test endpoint called with method: ${req.method}`);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Test environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const databaseUrl = process.env.DATABASE_URL;
    
    console.log('Environment check:');
    console.log('- SUPABASE_URL exists:', !!supabaseUrl);
    console.log('- DATABASE_URL exists:', !!databaseUrl);
    
    return res.status(200).json({
      success: true,
      message: 'Test endpoint working!',
      timestamp: new Date().toISOString(),
      method: req.method,
      environment: {
        supabaseUrl: supabaseUrl ? 'SET' : 'NOT SET',
        databaseUrl: databaseUrl ? 'SET' : 'NOT SET',
        nodeEnv: process.env.NODE_ENV
      }
    });
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    return res.status(500).json({
      error: 'Test endpoint failed',
      message: error.message,
      stack: error.stack
    });
  }
}; 