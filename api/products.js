const express = require('express');
require('dotenv/config');

// Import the storage and schema modules
let storage, insertProductSchema;

const initializeModules = async () => {
  if (!storage) {
    const storageModule = await import('../server/storage.js');
    const schemaModule = await import('../shared/schema.js');
    storage = storageModule.storage;
    insertProductSchema = schemaModule.insertProductSchema;
  }
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await initializeModules();

  try {
    if (req.method === 'GET') {
      if (req.query.id) {
        // Get single product
        const id = parseInt(req.query.id);
        const product = await storage.getProduct(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.json(product);
      } else {
        // Get all products
        const products = await storage.getProducts();
        return res.json(products);
      }
    } else if (req.method === 'POST') {
      // Create product
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      return res.status(201).json(product);
    } else if (req.method === 'PUT') {
      // Update product
      const id = parseInt(req.query.id);
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    } else if (req.method === 'DELETE') {
      // Delete product
      const id = parseInt(req.query.id);
      await storage.deleteProduct(id);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 