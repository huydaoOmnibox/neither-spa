import { storage, loginSchema } from './utils.js';
import jwt from 'jsonwebtoken';

// JWT secret from environment variable - required for production
const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET || 'dev-fallback-key-not-for-production';

export default async (req, res) => {
  try {
    console.log(`${req.method} request to /api/login`);
    
    // Validate JWT secret is configured for production
    if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'dev-fallback-key-not-for-production') {
      console.error('JWT_SECRET not configured for production!');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Authentication service unavailable'
      });
    }
    
    // Enable CORS for production domain
    const allowedOrigins = [
      'https://www.nailsofthenetherlands.nl',
      'https://nailsofthenetherlands.nl',
      'http://localhost:3000' // Keep for development
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate request body
    const { username, password } = loginSchema.parse(req.body);

    // Find user in database
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }

    // Simple password comparison (in production, use bcrypt for hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        customerId: user.customerId 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success with token and user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

      } catch (error) {
      console.error('Login API Error:', error.message || error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: 'Validation error',
          message: 'Invalid username or password format',
          ...(process.env.NODE_ENV === 'development' && { details: error.errors })
        });
      }
      
      // Don't expose internal errors in production
      return res.status(500).json({ 
        error: 'Internal server error',
        message: 'Login failed. Please try again.',
        ...(process.env.NODE_ENV === 'development' && { 
          stack: error.stack,
          details: error.message 
        })
      });
    }
}; 