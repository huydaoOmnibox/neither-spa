const express = require('express');
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes dynamically to avoid ES module issues
let routesRegistered = false;

module.exports = async (req, res) => {
  // Register routes only once
  if (!routesRegistered) {
    const { registerRoutes } = await import('../server/routes.js');
    await registerRoutes(app);
    routesRegistered = true;
  }
  
  // Handle the request
  return app(req, res);
}; 