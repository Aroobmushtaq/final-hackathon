const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const userRoutes=require("./routes/userRoutes")
const profileRoutes=require("./routes/profileRoutes")
const noteRoutes=require("./routes/noteRoutes")
const app = express();
// Middleware
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/api/users', userRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/notes', noteRoutes);
module.exports = app; 