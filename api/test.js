export default async (req, res) => {
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
    console.log('- DATABASE_URL value:', databaseUrl ? databaseUrl.replace(/:[^:@]*@/, ':***@') : 'NOT SET');
    
    // Test database connection
    let dbTest = 'NOT TESTED';
    try {
      const { storage } = await import('./utils.js');
      await storage.getProducts();
      dbTest = 'SUCCESS';
    } catch (dbError) {
      dbTest = `FAILED: ${dbError.message}`;
      console.error('Database test failed:', dbError);
    }
    
    return res.status(200).json({
      success: true,
      message: 'Test endpoint working!',
      timestamp: new Date().toISOString(),
      method: req.method,
      environment: {
        supabaseUrl: supabaseUrl ? 'SET' : 'NOT SET',
        databaseUrl: databaseUrl ? 'SET' : 'NOT SET',
        databaseUrlMasked: databaseUrl ? databaseUrl.replace(/:[^:@]*@/, ':***@') : 'NOT SET',
        nodeEnv: process.env.NODE_ENV
      },
      databaseTest: dbTest
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