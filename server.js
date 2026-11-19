const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("DecodeLabs Project 3 API is running!");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// 404 Route Handler (If no route matches)
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong on the server" });
});

mongoose.connect(MONGO_URI)
  .then(() => {
      console.log(" Successfully connected to MongoDB!");
      app.listen(PORT, () => {
          console.log(` Server running on http://localhost:${PORT}`);
      });
  })
  .catch((error) => {
      console.error(" MongoDB connection error:", error.message);
  });