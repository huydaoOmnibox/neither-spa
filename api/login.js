import { storage, loginSchema } from './utils.js';
import jwt from 'jsonwebtoken';

// Simple JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async (req, res) => {
  try {
    console.log(`${req.method} request to /api/login`);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
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
    console.error('Login API Error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Login failed'
    });
  }
}; 