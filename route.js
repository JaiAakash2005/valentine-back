const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://jaiaakash57:9Uz1Vm4YIFfncsNX@authenticate.ldkobs2.mongodb.net/valentineDB",
  )
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  relationship: {
    type: String,
    enum: ["Single", "Committed"],
    default: "Single",
  },
  valentineResult: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/save", async (req, res) => {
  try {
    const { name, status } = req.body;

    const newUser = new User({
      name,
      status,
    });

    await newUser.save();

    res.status(201).json({
      message: "Saved successfully 💘",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
